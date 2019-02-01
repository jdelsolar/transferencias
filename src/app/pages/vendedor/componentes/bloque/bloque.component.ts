import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { TransferenciasService } from "src/app/services/transferencias.service";
import { VendedorService } from "src/app/services/vendedor.service";
import { SubirArchivoService } from "src/app/services/subir-archivo.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-bloque",
  templateUrl: "./bloque.component.html",
  styleUrls: ["./bloque.component.css"]
})
export class BloqueComponent implements OnInit {
  @Input() bloque: any;

  _forma = true;

  @Input() tasa: string = "";

  @Input() comision: string = "";

  imagen: string = null;
  imagenSubir: File;
  comprobante: string = "";
  adjuntando: boolean = false;
  cargando = false;

  formDestinatario: boolean = false;

  forma: FormGroup;

  constructor(
    public _transferencias: TransferenciasService,
    public _subir: SubirArchivoService,
    public _vendedor: VendedorService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      id_destinatario: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      correo: new FormControl("", Validators.email),
      monto: new FormControl("10000", [Validators.required]),
      montobs: new FormControl("")
    });
    if (this.tasa != "") {
      this.formCalcularBs();
    }
  }

  formCalcularBs() {
    const monto = this.forma.get("monto").value;
    const tasa = this.tasa;
    this.forma.get("montobs").setValue(this.calcularBs(monto, tasa));
  }

  ocultarForma() {
    this._forma = true;
  }
  mostrarForma() {
    this._forma = false;
  }

  calcularBs(monto, tasa) {
    return Math.round(parseFloat(monto) * parseFloat(tasa) * 100.0) / 100.0;
  }

  restantes() {
    return parseFloat(this.bloque.montobs) - parseFloat(this.bloque.total_bs);
  }

  seleccionarImagen(img: File) {
    if (img) {
      this.imagenSubir = img;

      if (img.type.indexOf("image") >= 0) {
        const reader = new FileReader();
        const urlTemp = reader.readAsDataURL(img);

        reader.onloadend = () => {
          this.imagen = reader.result.toString();
        };
        this.adjuntando = true;
        this._subir
          .subirArchivo(img)
          .then((resp: any) => {
            this.comprobante = resp.mensaje.upload_data.file_name;
            this.adjuntando = false;
          })
          .catch(() => {
            this.comprobante = "";
            this.imagenSubir = null;
            this.imagen = null;
            this.adjuntando = false;
            swal("Error al subir la imagen");
          });
      }
    } else {
      this.imagenSubir = null;
      this.comprobante = "";
    }
  }

  ocultar_destinatario(event) {
    this.formDestinatario = event;
  }

  cambiarDestinatario(event: any) {
    this.forma.get("id_destinatario").setValue(event);
    this.formDestinatario = false;
  }

  quitarDestinatario() {
    if (!confirm("Está seguro de quitar el destinatario?")) {
      return;
    }
    const id_destinatario = this.forma.get("id_destinatario").value;
    console.log(id_destinatario);

    this._vendedor
      .quitar_destinatario(id_destinatario)
      .then(() => {
        this._vendedor.lista_destinatarios().then(() => {
          this.forma.get("id_destinatario").setValue("");
        });
      })
      .catch(() => {
        swal("Error al quitar el destinatario");
      });
  }

  enviar() {
    // id_destinatario, imagen, monto, tasa, nombre, correo, id_vendedor, comision

    if (!this.forma.valid) {
      return;
    }
    if(!confirm("Está seguro que desea agregar la transferencia?")) {
      return;
    }
    const id_destinatario = this.forma.get("id_destinatario").value;
    const imagen = this.comprobante;
    const monto = this.forma.get("monto").value;
    const tasa = this.tasa;
    const nombre = this.forma.get("nombre").value;
    const correo = this.forma.get("correo").value;
    const id_vendedor = this._vendedor.vendedor.id;
    const comision = this.comision;

    this.cargando = true;
    this._vendedor
      .agregar_transferencia(
        id_destinatario,
        imagen,
        monto,
        tasa,
        nombre,
        correo,
        id_vendedor,
        comision
      )
      .then(() => {
        this.cargando = false;
        this._vendedor.getBloques();
      })
      .catch(() => {
        swal("Error al agregar una transferencia");
      });
  }
}

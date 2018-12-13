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

  // @ViewChild("comprobante") comprobante: ElementRef;

  imagen: string = null;
  imagenSubir: File;
  comprobante: string = "";
  adjuntando: boolean = false;

  formDestinatario: boolean = false;

  forma: FormGroup;


  constructor(
    public _transferencias: TransferenciasService,
    public _subir: SubirArchivoService,
    public _vendedor: VendedorService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      id_destinatario: new FormControl("", Validators.required)
    });
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

  ocultar_destinatario( event ) {
    this.formDestinatario = event;
  }

  cambiarDestinatario(event: any) {
    console.log( event );
    this.forma.get("id_destinatario").setValue(event);
    this.formDestinatario = false;
  }

}

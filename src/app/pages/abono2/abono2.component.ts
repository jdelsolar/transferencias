import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  TransferenciasService,
  Destinatario
} from "../../services/transferencias.service";
import { Subscription, from } from "rxjs";
import { ParametrosService } from "../../services/parametros.service";
import { SubirArchivoService } from "../../services/subir-archivo.service";
import { Router } from "@angular/router";
import { PagosService } from "../../services/pagos.service";

import swal from 'sweetalert';

declare function crear_boton(resp);

@Component({
  selector: "app-abono2",
  templateUrl: "./abono2.component.html",
  styleUrls: ["./abono2.component.css"]
})
export class Abono2Component implements OnInit, OnDestroy {
  @ViewChild("btnModalDestinatarios")
  btnModalDestinatarios: ElementRef;
  imagen: string = null;
  imagenSubir: File;
  forma: FormGroup;
  subscribe: Subscription;
  btnCargando: boolean = false;

  constructor(
    public _usuario: UsuarioService,
    public _transferencias: TransferenciasService,
    public _parametros: ParametrosService,
    public _subir: SubirArchivoService,
    private _router: Router,
    public _pagos: PagosService
  ) {}

  ngOnInit() {
    // this.btnModalDestinatarios.nativeElement.click();
    this._transferencias.obtenerDestinatarios();
    this.forma = new FormGroup({
      monto: new FormControl(10000, [
        Validators.required,
        Validators.min(10000)
      ]),
      tasa: new FormControl({ value: "", disabled: true }, Validators.required),
      montofinal: new FormControl({ value: "", disabled: true }),
      misDestinatarios: new FormControl("", Validators.required)
    });

    this.subscribe = this._parametros.observarTasa().subscribe((resp: any) => {
      console.log(resp);
      switch (this._usuario.usuario.pais) {
        case "Chile":
          this.forma.get("tasa").setValue(resp.tasa);

          break;
        case "Argentina":
          this.forma.get("tasa").setValue(resp.argentina);

          break;
        case "Colombia":
          this.forma.get("tasa").setValue(resp.colombia);

          break;
        default:
          this.forma.get("tasa").setValue(resp.tasa);

          break;
      }
      this.calcular();
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  cerrarModal() {
    this.btnModalDestinatarios.nativeElement.click();
  }

  modalDestinatario(destinatario: Destinatario) {
    console.log("destinatario");
    console.log(destinatario);
    this.btnModalDestinatarios.nativeElement.click();
    this._transferencias.obtenerDestinatarios().then(() => {
      this._transferencias.misDestinatarios.forEach(dest => {
        if (dest.id === destinatario.id) {
          this.forma.get("misDestinatarios").setValue(dest.id);
          return;
        }
      });
    });
  }

  abrirModal() {
    this.btnModalDestinatarios.nativeElement.click();
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
      }
    } else {
      this.imagenSubir = null;
    }
  }

  quitar() {
    if (this.forma.get("misDestinatarios").value === "") {
      swal("Seleccione un destinatario");
      return;
    }

    swal({
      title: "Está Seguro?",
      text: "Está seguro que desea eliminar el destinatario permanentemente?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", "Aceptar"]
    }).then((val: any) => {
      if (val) {
        const id_destinatario = this.forma.get("misDestinatarios").value;
        this._transferencias.quitar_destinatario(id_destinatario).subscribe(
          (resp: any) => {
            if (resp.respuesta) {
              this._transferencias.obtenerDestinatarios();
              this.forma.get("misDestinatarios").setValue("");
              swal(resp.mensaje);
            } else {
              swal(resp.mensaje);
            }
          },
          err => {
            swal("Ocurrió un error");
          }
        );
      }
    });
  }

  calcular() {
    const monto = this.forma.get("monto").value;
    const tasa = this.forma.get("tasa").value;

    this.forma.get("montofinal").setValue(monto * tasa);
  }

  enviar() {
    if (this.forma.valid) {
      this.btnCargando = true;

      const transferencia = {
        id_destinatario: this.forma.get("misDestinatarios").value,
        monto: this.forma.get("monto").value,
        tasa: this.forma.get("tasa").value,
        imagen: "",
        id_usuario: this._usuario.usuario.id_usuario
      };

      if (this.imagenSubir) {
        this._subir
          .subirArchivo(this.imagenSubir)
          .then((resp: any) => {
            transferencia.imagen = resp.mensaje.upload_data.file_name;
            this._transferencias.agregarTransferencia(transferencia).subscribe(
              (resp2: any) => {
                if (resp2.respuesta) {
                  // todo bien
                  console.log("todo bien");
                  this._router.navigateByUrl("transferencias");
                  this.btnCargando = false;
                } else {
                  // algo pasa
                  // console.log("algo pasa");
                  this.btnCargando = false;
                  swal("Error al guardar la transferencia");
                }
              },
              err => console.log("Error ", err)
            );
          })
          .catch(err => {
            // console.log('Error al subir el archivo', err);
            swal("Error al subir el archivo");
          });
      } else {
        this._transferencias.agregarTransferencia(transferencia).subscribe(
          (resp2: any) => {
            if (resp2.respuesta) {
              // todo bien
              // console.log("todo bien");
              this._router.navigateByUrl("transferencias");
            } else {
              // algo pasa
              console.log("algo pasa");
              swal("Error al guardar la transferencia");
            }
          },
          err => console.log("Error ", err)
        );
      }
    }
  }

  pagoKhipu() {
    if (!this.forma.valid) {
      swal("Faltan campos por completar");
      return;
    }
    this._pagos
      .iniciarPagoKhipu(
        this.forma.get("misDestinatarios").value,
        this.forma.get("monto").value,
        this.forma.get("tasa").value
      )
      .then((resp: any) => {
        crear_boton(resp);
      });
  }
}

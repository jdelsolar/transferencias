import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import {
  TransferenciasService,
  Destinatario,
  Transferencia
} from "../../services/transferencias.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Router } from "@angular/router";

import { SubirArchivoService } from "../../services/subir-archivo.service";

import swal from 'sweetalert';

@Component({
  selector: "app-abono",
  templateUrl: "./abono.component.html",
  styleUrls: ["./abono.component.css"]
})
export class AbonoComponent implements OnInit {
  imagen: string = null;

  imagenSubir: File;

  destinatario = "nuevo";

  forma: FormGroup;

  btnCargando: boolean = false;

  constructor(
    public _usuario: UsuarioService,
    public _transferencias: TransferenciasService,
    private _router:Router,
    public _subir:SubirArchivoService
  ) {}

  ngOnInit() {
    this._transferencias.obtenerDestinatarios();

    this.forma = new FormGroup({
      monto: new FormControl(null, [
        Validators.required,
        Validators.min(10000)
      ]),
      tasa: new FormControl({ value: "371", disabled: true }),
      montofinal: new FormControl({ value: "", disabled: true }),
      pais: new FormControl("Venezuela", Validators.required),
      nombre: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      ci: new FormControl(null, [Validators.required]),
      banco: new FormControl(null, Validators.required),
      tipocuenta: new FormControl(null, Validators.required),
      ncuenta: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      declaro: new FormControl(false),
      misDestinatarios: new FormControl()
    });
  }

  cambioDestinatario() {
    let id = this.forma.get("misDestinatarios").value;
    let seleccionado: Destinatario = null;

    this._transferencias.misDestinatarios.forEach((dest: Destinatario) => {
      if (dest.id === id) {
        seleccionado = dest;
      }
    });

    if (seleccionado) {
      this.forma.get("pais").setValue(seleccionado.pais);
      this.forma.get("nombre").setValue(seleccionado.nombre);
      this.forma.get("ci").setValue(seleccionado.ci);
      this.forma.get("banco").setValue(seleccionado.banco);
      this.forma.get("tipocuenta").setValue(seleccionado.tipo_cuenta);
      this.forma.get("ncuenta").setValue(seleccionado.ncuenta);
      this.forma.get("correo").setValue(seleccionado.correo);
    }
  }

  pestanaDestinatarios(estado: string) {
    this.destinatario = estado;
    //console.log(estado);
    if (estado === "lista") {
      this.forma.get("pais").disable();
      this.forma.get("nombre").disable();
      this.forma.get("ci").disable();
      this.forma.get("banco").disable();
      this.forma.get("tipocuenta").disable();
      this.forma.get("ncuenta").disable();
      this.forma.get("correo").disable();
    } else {
      this.forma.get("pais").enable();
      this.forma.get("nombre").enable();
      this.forma.get("ci").enable();
      this.forma.get("banco").enable();
      this.forma.get("tipocuenta").enable();
      this.forma.get("ncuenta").enable();
      this.forma.get("correo").enable();
    }
  }

  enviar() {
    if (this.forma.valid) {

      this.btnCargando = true;

      if (this.destinatario === "lista") {
        let transferencia: Transferencia;
        transferencia = {
          id_destinatario: this.forma.get("misDestinatarios").value,
          monto: this.forma.get("monto").value,
          tasa: this.forma.get("tasa").value,
          imagen: "",
          id_usuario: this._usuario.usuario.id_usuario
        };

        //mandamos la imagen 
        if ( this.imagenSubir ) {
         
          this._subir.subirArchivo( this.imagenSubir ).then( (resp:any) => {

            console.log( resp );
            transferencia.imagen = resp.mensaje.upload_data.file_name;
            this._transferencias.agregarTransferencia(transferencia).subscribe(
              (resp2: any) => {
                if (resp2.respuesta) {
                  // todo bien
                  console.log("todo bien");
                  this._router.navigateByUrl('transferencias');
                  this.btnCargando = false;
                } else {
                  // algo pasa
                  //console.log("algo pasa");
                  this.btnCargando = false;
                  swal('Error al guardar la transferencia');
                }
              },
              err => console.log("Error ", err)
            );

          }).catch( err => {
            //console.log('Error al subir el archivo', err);
            swal( 'Error al subir el archivo' );
          })
          
        } else {

          this._transferencias.agregarTransferencia(transferencia).subscribe(
            (resp2: any) => {
              if (resp2.respuesta) {
                // todo bien
                //console.log("todo bien");
                this._router.navigateByUrl('transferencias');
              } else {
                // algo pasa
                console.log("algo pasa");
                swal( 'Error al guardar la transferencia' );
              }
            },
            err => console.log("Error ", err)
          );

        }

      } else {
        let destinatario: Destinatario = {
          banco: this.forma.get("banco").value,
          ci: this.forma.get("ci").value,
          id_usuario: this._usuario.usuario.id_usuario,
          tipo_cuenta: this.forma.get("tipocuenta").value,
          nombre: this.forma.get("nombre").value,
          correo: this.forma.get("correo").value,
          ncuenta: this.forma.get("ncuenta").value,
          pais: this.forma.get("pais").value
        };

        let transferencia: Transferencia;

        this._transferencias.agregarDestinatario(destinatario).subscribe(
          (resp: any) => {
            if (resp.respuesta) {
              destinatario = resp.destinatario;

              transferencia = {
                id_destinatario: destinatario.id,
                monto: this.forma.get("monto").value,
                tasa: this.forma.get("tasa").value,
                imagen: "",
                id_usuario: this._usuario.usuario.id_usuario
              };

              if ( this.imagenSubir ) {
                // enviar la imagen y luego la transferencia
                this._subir.subirArchivo( this.imagenSubir ).then( (resp:any) => {

                  transferencia.imagen = resp.mensaje.upload_data.file_name;

                  this._transferencias
                  .agregarTransferencia(transferencia)
                  .subscribe(
                    (resp2: any) => {
                      if (resp2.respuesta) {
                        // todo bien
                        console.log("todo bien");
                        this._router.navigateByUrl('transferencias');
                      } else {
                        // algo pasa
                        //console.log("algo pasa");
                        swal('Error al guardar la transferencia');
                      }
                    },
                    err => console.log("Error ", err)
                  );

                }).catch( err => {
                  //console.log('Error al enviar el archivo', err);
                  swal('Error al enviar el archivo');
                  
                });
              } else {
                
                this._transferencias
                  .agregarTransferencia(transferencia)
                  .subscribe(
                    (resp2: any) => {
                      if (resp2.respuesta) {
                        // todo bien
                        console.log("todo bien");
                        this._router.navigateByUrl('transferencias');
                      } else {
                        // algo pasa
                        //console.log("algo pasa");
                        swal('Error al guardar la transferencia');
                      }
                    },
                    err => console.log("Error ", err)
                  );

              }

            }
          },
          err => console.log("Error ", err)
        );
      }

      

    }
  }

  calcular() {
    let monto = this.forma.get("monto").value;
    let tasa = this.forma.get("tasa").value;

    this.forma.get("montofinal").setValue(monto * tasa);
  }

  seleccionarImagen(img: File) {
    if (img) {
      this.imagenSubir = img;

      if (img.type.indexOf("image") >= 0) {
        let reader = new FileReader();
        let urlTemp = reader.readAsDataURL(img);

        reader.onloadend = () => {
          this.imagen = reader.result.toString();
        };
      }
    } else {
      this.imagenSubir = null;

    }
  }
}

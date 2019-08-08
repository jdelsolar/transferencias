import { Component, OnInit } from "@angular/core";
import { UsuarioService, Usuario } from "../../services/usuario.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import swal from "sweetalert";
import { SubirArchivoService } from "src/app/services/subir-archivo.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  registrado: boolean = false;
  cargando: boolean = false;
  usuario: Usuario = {};

  forma: FormGroup;

  constructor(
    public _usuario: UsuarioService,
    private router: Router,
    public _subir: SubirArchivoService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      paterno: new FormControl(null, Validators.required),
      materno: new FormControl(null, Validators.required),
      nombres: new FormControl(null, Validators.required),
      pais: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      clave: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      ci: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      telefono: new FormControl(null),
      foto: new FormControl(null, Validators.required)
    });
  }


  seleccionarImagen(archivo: File) {
    if (archivo) {
      this._subir
        .subirArchivo(archivo)
        .then((resp: any) => {
          if (resp.respuesta) {
            let nombreArchivo = resp.mensaje.upload_data.file_name;
            this.forma.controls['foto'].setValue(nombreArchivo);
            console.log("archivo subido", nombreArchivo);
          } else {
            swal("Error al subir el archivo");
          }
        })
        .catch(err => {
          swal("Error al subir el archivo");
        });
    }
  }

  enviar() {
    if (this.forma.valid) {
      this.usuario = this.forma.value;
      this.guardar_usuario();
    }
  }

  guardar_usuario() {
    this.cargando = true;
    this._usuario.guardarUsuario(this.usuario).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.registrado = true;
          this.cargando = false;
          // console.log(resp);
          swal(
            "Se ha completado su registro, ya puede ingresar a 123depósitos."
          );
          // this.router.navigate(["/login"]);
          this.router.navigateByUrl("/pais/" + this.usuario.pais);
        }
      },
      err => {
        this.registrado = false;
        this.cargando = false;
        swal("Ocurrió un error en el registro.");
        console.log(err);
      }
    );
  }

  valido() {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (
      this.usuario.correo &&
      this.usuario.clave.length > 5 &&
      this.usuario.paterno &&
      this.usuario.materno &&
      this.usuario.pais &&
      emailRegex.test(this.usuario.correo) &&
      !this.cargando
    ) {
      return "";
    } else {
      return "disabled";
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { UsuarioService, Usuario } from "../../services/usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  registrado: boolean = false;
  cargando: boolean = false;
  usuario: Usuario = {};

  constructor(public _usuario: UsuarioService, private router: Router) {}

  ngOnInit() {}

  guardar_usuario() {
    this.cargando = true;
    this._usuario.guardarUsuario(this.usuario).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.registrado = true;
          this.cargando = false;
          //console.log(resp);
          swal("Se ha completado su registro, ya puede ingresar a 123depósitos.");
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.registrado = false;
        this.cargando = false;
        console.log(err);
      }
    );
  }

  valido() {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
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

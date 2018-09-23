import { Component, OnInit } from "@angular/core";
import { UsuarioService, Usuario } from "../../services/usuario.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
  

  constructor(public _usuario: UsuarioService, private router: Router) {}

  ngOnInit() {

    this.forma = new FormGroup({
      paterno: new FormControl(null, Validators.required),
      materno: new FormControl(null, Validators.required),
      nombres: new FormControl(null, Validators.required),
      pais: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      clave: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      ci: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  enviar(){
    
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

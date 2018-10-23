import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-recuperar",
  templateUrl: "./recuperar.component.html",
  styleUrls: ["./recuperar.component.css"]
})
export class RecuperarComponent implements OnInit {
  forma: FormGroup;
  enviando: boolean = false;
  cambiando: boolean = false;

  constructor(public _usuario: UsuarioService, private router: Router) {}

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup(
      {
        correo: new FormControl("", [Validators.required, Validators.email]),
        clave: new FormControl("", Validators.required),
        pass: new FormControl("", Validators.required),
        confirm: new FormControl("", Validators.required)
      },
      { validators: this.sonIguales("pass", "confirm") }
    );
  }

  enviar() {
    if (this.forma.valid) {
      this.cambiando = true;
      this._usuario
        .cambiarClave(
          this.forma.value.correo,
          this.forma.value.clave,
          this.forma.value.pass
        )
        .subscribe(
          (resp: any) => {
            if (resp.respuesta) {
              swal(resp.mensaje);
              this.cambiando = false;
              this.router.navigateByUrl("/login");
            } else {
              swal(resp.mensaje);
              this.cambiando = false;
            }
          },
          err => {
            swal("Error al cambiar la contraseña");
            this.cambiando = false;
          }
        );
    }
  }

  enviarClave() {
    if (this.forma.get("correo").valid) {
      this.enviando = true;
      this._usuario.enviarClaveVerificacion(this.forma.value.correo).subscribe(
        (resp: any) => {
          if (resp.respuesta) {
            swal(resp.mensaje);
          } else {
            swal(resp.mensaje);
          }
          this.enviando = false;
        },
        err => {
          swal("Error al enviar el correo");
          this.enviando = false;
        }
      );
    } else {
      swal("Escriba un correo válido.");
    }
  }
}

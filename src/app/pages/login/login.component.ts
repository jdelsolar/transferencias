import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

declare function init_collapse();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string = "";
  clave: string = "";

  cargando: boolean = false;

  logueado: boolean = false;

  error: string = "";

  constructor( public _usuario: UsuarioService, private router: Router ) { }

  ngOnInit() {
    init_collapse();
  }

  loginClick() {

    this.cargando = true;

    this._usuario.login( this.correo, this.clave ).then( (resp: boolean) => {

      if (resp) {
        this.logueado = true;
        this.error = "";

        this.router.navigateByUrl("/inicio");
      } else {
        // error en el registro
        this.error = "Correo o contraseña incorrecta.";
      }

      this.cargando = false;
    }).catch( err => {
      this.error = "Error de conexión";

      this.cargando = false;
    }) ;

  }

}

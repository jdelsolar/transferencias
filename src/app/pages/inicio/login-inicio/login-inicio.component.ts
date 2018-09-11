import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../../services/usuario.service";

@Component({
  selector: "app-login-inicio",
  templateUrl: "./login-inicio.component.html",
  styleUrls: ["./login-inicio.component.css"]
})
export class LoginInicioComponent implements OnInit {
  correo: string;
  clave: string;
  cargando:boolean = false;

  constructor( public _usuario:UsuarioService ) {}

  ngOnInit() {}

  loginClick() {
    this.cargando = true;

    this._usuario.login( this.correo, this.clave ).then( resp => {
      if( resp )  {
        // Logueado
        
      } else {
        // Error
        swal("Correo o contaseña no válidos.")
      }
      this.cargando = false;
    });
    
  }
  
}

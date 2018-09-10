import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-inicio",
  templateUrl: "./login-inicio.component.html",
  styleUrls: ["./login-inicio.component.css"]
})
export class LoginInicioComponent implements OnInit {
  correo: string;
  clave: string;
  cargando:boolean = false;

  constructor() {}

  ngOnInit() {}

  loginClick() {
    console.log("Ingreso");
    
  }
  
}

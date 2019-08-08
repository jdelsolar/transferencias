import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public _usuario: UsuarioService, public router: Router ) { }

  ngOnInit() {
    let pais = "Chile"; 
    if (this._usuario.usuario.pais) {
      pais = this._usuario.usuario.pais;
    }
  }

  cerrar() {

    this._usuario.cerrarSession();

  }

  cambiaPais(e: any) {
    // console.log("entra al evento", e.srcElement.value);
    this._usuario.usuario.pais = e.srcElement.value;
    this.router.navigateByUrl("/pais/" + e.srcElement.value);
  }

}

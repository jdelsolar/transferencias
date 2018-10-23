import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public _usuario: UsuarioService ) { }

  ngOnInit() {
  }

  cerrar() {

    this._usuario.cerrarSession();

  }

}

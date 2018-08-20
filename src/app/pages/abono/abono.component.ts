import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: ['./abono.component.css']
})
export class AbonoComponent implements OnInit {

  pesos: number = 0 ;
  tasa: number = 371;
  bolivares:number = 0;

  constructor( public _usuario:UsuarioService ) { }

  ngOnInit() {

  }

  calcular() {

    this.bolivares =  this.pesos * this.tasa;
    
  }

}

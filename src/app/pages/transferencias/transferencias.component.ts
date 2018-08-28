import { Component, OnInit } from '@angular/core';
import { TransferenciasService } from '../../services/transferencias.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  constructor( public _transf: TransferenciasService, public _usuario: UsuarioService  ) { }

  ngOnInit() {
    this._transf.obtenerTransferencias(  );
  }

}

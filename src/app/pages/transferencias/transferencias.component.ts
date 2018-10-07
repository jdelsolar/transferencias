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

  // estados = ["Aprobado", "Rechazado", "Pendiente", "Finalizado"];

  colorEstado(estado: string) {
    if (estado === "Aprobado") {
      return "badge badge-pill badge-success";
    }
    if (estado === "Rechazado") {
      return "badge badge-pill badge-danger";
    }
    if (estado === "Pendiente") {
      return "badge badge-pill badge-info";
    }
    if (estado === "Finalizado") {
      return "badge badge-pill badge-primary";
    }
  }

}

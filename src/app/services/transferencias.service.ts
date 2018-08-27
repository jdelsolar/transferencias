import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { URL_SERVICIOS } from "../../config";
import { UsuarioService } from "./usuario.service";

@Injectable({
  providedIn: "root"
})
export class TransferenciasService {
  bancos: any[] = [];

  api: string = URL_SERVICIOS;

  misTransferencias: TransferenciaDestinatario[] = [];

  misDestinatarios: Destinatario[] = [];


  constructor(private http: HttpClient, private _usuario: UsuarioService) {
    this.obtenerBancos();

    this.obtenerTransferencias( );
  }

  obtenerBancos() {
    this.http.get("assets/data/bancos.json").subscribe((resp: any) => {
      this.bancos = resp.bancos;
      //console.log( this.bancos );
    });
  }

  agregarDestinatario(destinatario: Destinatario) {
    let url = this.api + "/transferencias/agregar_destinatario";
    let post = {
      pais: destinatario.pais,
      nombre: destinatario.nombre,
      ci: destinatario.ci,
      banco: destinatario.banco,
      tipo_cuenta: destinatario.tipo_cuenta,
      ncuenta: destinatario.ncuenta,
      correo: destinatario.correo,
      id_usuario: destinatario.id_usuario
    };
    return this.http.post(url, post);
  }

  agregarTransferencia( transf: Transferencia ){
    let url = this.api + "/transferencias/agregar_transferencia";
    let post = {
      id_destinatario: transf.id_destinatario,
      imagen: transf.imagen,
      monto: transf.monto,
      tasa: transf.tasa,
      estado: 'Pendiente',
      id_usuario: transf.id_usuario
    }
    return this.http.post(url, post);
    
  }

  obtenerTransferencias( ) {
    let url = this.api + "/transferencias/obtener_transferencias/" + this._usuario.usuario.id_usuario ;

    this.http.get( url ).subscribe((resp:any) => {
      if (resp.respuesta){
        this.misTransferencias = resp.transferencias
      }
    });
  }

  obtenerDestinatarios() {
    let url = this.api + "/transferencias/obtener_destinatarios/" + this._usuario.usuario.id_usuario ;

    this.http.get( url ).subscribe((resp:any) => {
      if (resp.respuesta){
        this.misDestinatarios = resp.destinatarios
      }
    });
  }
  
}

export interface Transferencia {
  id?: string;
  id_destinatario?: string;
  imagen?: string;
  monto?: string;
  tasa?: string;
  estado?: string;
  fecha?: string;
  fecha_estado?: string;
  id_usuario?: string;
}

export interface Destinatario {
  id?: string;
  pais?: string;
  nombre?: string;
  ci?: string;
  banco?: string;
  tipo_cuenta?: string;
  ncuenta?: string;
  correo?: string;
  fecha?: string;
  id_usuario?: string;
}


interface TransferenciaDestinatario {
  transferencia?: Transferencia;
  destinatario?: Destinatario;
}

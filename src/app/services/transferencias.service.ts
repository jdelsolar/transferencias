import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { URL_SERVICIOS } from "../../config";

@Injectable({
  providedIn: "root"
})
export class TransferenciasService {
  bancos: any[] = [];

  api: string = URL_SERVICIOS;

  constructor(private http: HttpClient) {
    this.obtenerBancos();
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

  agregarTransferencia( transf: Tranferecia ){
    let url = this.api + "/transferencias/agregar_transferencia";
    let post = {
      id_destinatario: transf.id_destinatario,
      imagen: transf.imagen,
      monto: transf.monto,
      tasa: transf.tasa,
      estado: 'INI'
    }
    return this.http.post(url, post);
    
  }
}

export interface Tranferecia {
  id?: string;
  id_destinatario?: string;
  imagen?: string;
  monto?: string;
  tasa?: string;
  estado?: string;
  fecha?: string;
  fecha_estado?: string;
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

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config";

import swal from 'sweetalert';

@Injectable({
  providedIn: "root"
})
export class ContactoService {
  mensaje: Mensaje = {};

  cargando: boolean = false;

  constructor(private http: HttpClient) {}

  enviar() {
    let url = URL_SERVICIOS + "/mensajes/contacto";
    this.cargando = true;
    let promesa = new Promise((resolve, reject) => {
      this.http.post(url, this.mensaje).subscribe(
        (resp: any) => {
          if (resp.respuesta) {
            this.cargando = false;
            swal("Mensaje enviado.");
            resolve();
          } else {
            this.cargando = false;
            swal("Error al enviar el mensaje");
            reject();
          }
        },
        err => {
          swal("Error al enviar el mensaje");
          reject();
        }
      );
    });
    return promesa;
  }
}

export interface Mensaje {
  nombre?: string;
  email?: string;
  asunto?: string;
  nacionalidad?: string;
  mensaje?: string;
}

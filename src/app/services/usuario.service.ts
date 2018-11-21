import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  api: string = URL_SERVICIOS;

  usuario: Usuario = {};

  constructor(private http: HttpClient) {
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
  }

  public cerrarSession() {
    this.usuario = {};
    localStorage.clear();
  }

  private guardarStorage() {
    if (this.usuario) {
      localStorage.setItem("usuario", JSON.stringify(this.usuario));
    }
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post(this.api + "/usuario/agregar_usuario", usuario);
  }

  login(correo: string, clave: string) {
    const promesa = new Promise((resolve, reject) => {
      this.http
        .post(this.api + "/usuario/login", { correo: correo, clave: clave })
        .subscribe(
          (resp: any) => {
            console.log(resp);
            if (resp.respuesta) {
              console.log(JSON.stringify(resp.usuario));
              this.usuario = resp.usuario;
              this.guardarStorage();

              resolve(true);
            } else {
              resolve(false);
            }
          },
          err => {
            reject(err);
          }
        );
    });

    return promesa;
  }

  enviarClaveVerificacion(correo: string) {
    const url = URL_SERVICIOS + "/usuario/enviar_cod_cambio";
    return this.http.post(url, { correo: correo });
  }
  cambiarClave(correo: string, confirm: string, nueva: string) {
    const url = URL_SERVICIOS + "/usuario/cambiar_clave";
    return this.http.post( url, { correo: correo, confirm: confirm, nueva: nueva } );
  }
}

export interface Usuario {
  id_usuario?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fecha_registro?: string;
  pais?: string;
  correo?: string;
  clave?: string;
  token?: any;
  ci?: string;
  telefono?: string;
}

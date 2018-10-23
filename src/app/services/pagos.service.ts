import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "./usuario.service";
import { URL_SERVICIOS } from "src/config";

@Injectable({
  providedIn: "root"
})
export class PagosService {
  constructor(private http: HttpClient, public _usuario: UsuarioService) {}

  iniciarPago() {
    return new Promise((resolve, reject) => {
      const params: any = {
        token: this._usuario.usuario.token,
        id_usuario: this._usuario.usuario.id_usuario,
        monto: 1000
      };
      const url = URL_SERVICIOS + "/pagos/generar_pago";
      console.log(url);
      console.log(params);
      this.http.post(url, params).subscribe(
        (resp: any) => {
          console.log(resp);
          resolve(resp);
        },
        (err: any) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  iniciarPagoKhipu(id_destinatario, monto, tasa) {
    return new Promise((resolve, reject) => {
      const params = {
        id_destinatario: id_destinatario,
        monto: monto,
        tasa: tasa,
        id_usuario: this._usuario.usuario.id_usuario,
        token: this._usuario.usuario.token
      };
      const url = URL_SERVICIOS + "/pagos/iniciar_pago";
      this.http.post(url, params).subscribe((resp: any) => {
        resolve(resp);
      }, (err: any) => {
        reject(err);
      });
    });
  }
}

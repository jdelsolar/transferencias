import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/config";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VendedorService {
  cargando: boolean = false;

  vendedor: Vendedor = {};

  bloques: Bloque[] = [];

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem("vendedor")) {
      this.vendedor = JSON.parse(localStorage.getItem("vendedor"));
    }

    this.getBloques();
  }

  login(params: any) {
    return new Promise((resolve, reject) => {
      this.cargando = true;
      const url = URL_SERVICIOS + "/vendedor/login";
      this.http.post(url, params).subscribe(
        (resp: any) => {
          this.cargando = false;
          if (resp.respuesta) {
            this.vendedor = resp.vendedor;

            localStorage.setItem("vendedor", JSON.stringify(this.vendedor));

            this.router.navigateByUrl("/vendedor");
          } else {
            swal(resp.mensaje);
          }
          resolve();
        },
        err => {
          this.cargando = false;
          swal("Ocurrión un error, intente de nuevo mas tarde.");

          reject();
        }
      );
    });
  }

  obtenerParams() {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/parametros/obtener_tasa";
      this.http.get(url).subscribe(
        (resp: any) => {
          // this.tasa = resp.tasa;
          resolve(resp);
        },
        err => reject()
      );
    });
  }

  observarParams(): Observable<any> {
    return new Observable(observer => {
      this.obtenerParams().then((resp: any) => {
        observer.next(resp);
      });
      const intervalo = setInterval(() => {
        this.obtenerParams().then((resp: any) => {
          observer.next(resp);
        });
      }, 30000);
    });
  }

  getBloques() {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/vendedor/get_bloques";
      this.http.get(url).subscribe(
        (resp: any) => {
          // this.tasa = resp.tasa;
          this.bloques = resp.bloques;
          resolve();
        },
        err => reject()
      );
    });
  }
}

interface Vendedor {
  id?: string;
  correo?: string;
  nombre?: string;
  fecha?: string;
  token?: string;
  clave?: string;
  rol?: string;
}
interface Bloque {
  id?: string;
  montochp?: string;
  montobs?: string;
  saldo?: string;
  fecha?: string;
}

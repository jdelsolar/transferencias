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

  cantidad: number = 0;

  paginas: number[] = [];

  actual: number;

  destinatarios: any[] = [];

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem("vendedor")) {
      this.vendedor = JSON.parse(localStorage.getItem("vendedor"));
    }

    if( this.vendedor ) {
      this.lista_destinatarios();
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

  getTransferenciasPorBloque(bloque: any) {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/compras/transferencias_por_compra";
      this.http.post(url, { id_compra: bloque.id }).subscribe(
        (resp: any) => {
          resolve(resp);
        },
        err => reject()
      );
    });
  }

  getBloques(pag: string = "0") {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/vendedor/get_bloques/" + pag;
      this.http.get(url).subscribe(
        (resp: any) => {
          // this.tasa = resp.tasa;
          this.bloques = resp.bloques;
          // agregar transferencias a los bloques
          for (let i = 0; i < this.bloques.length; i++) {
            this.getTransferenciasPorBloque(this.bloques[i]).then((t: any) => {
              this.bloques[i].transferencias = t.transferencias;
              this.bloques[i].total_chp = t.total_chp;
              this.bloques[i].total_bs = t.total_bs;
            });
          }

          this.actual = parseInt(pag, 10);
          this.cantidad = parseInt(resp.cantidad, 10);
          this.paginas = [];
          for (let i = 0; i < this.cantidad; i++) {
            this.paginas.push(i);
          }
          resolve();
        },
        err => reject()
      );
    });
  }

  insertDestinatario(destinatario: any) {
    const url = URL_SERVICIOS + "/vendedor/insert_destinatario";
    return new Promise((resolve, reject) => {
      this.http.post(url, destinatario).subscribe(
        (resp: any) => {
          resolve(resp);
        },
        err => {
          reject();
        }
      );
    });
  }

  lista_destinatarios() {
    if (!this.vendedor.id) {
      return;
    }
    const url =
      URL_SERVICIOS + "/vendedor/lista_destinatarios/" + this.vendedor.id;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe( (resp: any) => {
        this.destinatarios = resp.destinatarios;
        resolve();
      }, err => {
        reject();
      });
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
  total_chp?: string;
  total_bs?: string;
  transferencias?: any;
}

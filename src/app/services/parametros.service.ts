import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http: HttpClient) { }

  observarTasa(): Observable<string> {
    return new Observable(observer => {
      this.obtenerTasa().then((resp: string) => {
        observer.next(resp);
      });
      const intervalo = setInterval(() => {
        this.obtenerTasa().then((resp: string) => {
          observer.next(resp);
        });
      }, 30000);
    });
  }

  obtenerTasa() {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/parametros/obtener_tasa";
      this.http.get(url).subscribe(
        (resp: any) => {
          // this.tasa = resp.tasa;
          resolve(resp.tasa);
        },
        err => reject()
      );
    });
  }

}

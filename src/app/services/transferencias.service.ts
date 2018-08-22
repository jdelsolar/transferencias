import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TransferenciasService {

  bancos: any[] = [];

  constructor(private http: HttpClient) {

    this.obtenerBancos();
  }

  obtenerBancos() {
    this.http.get("assets/data/bancos.json").subscribe((resp:any) => {  
      this.bancos = resp.bancos;
      //console.log( this.bancos );
    });
  }
}

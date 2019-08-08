import { Component, OnInit, OnDestroy } from "@angular/core";
import { ParametrosService } from "../../../services/parametros.service";
import { Subscription } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-simula-cambio",
  templateUrl: "./simula-cambio.component.html",
  styleUrls: ["./simula-cambio.component.css"]
})
export class SimulaCambioComponent implements OnInit, OnDestroy {
  pesos: number = 10000;

  bolivares: number;

  tasa: number;

  p_tasa: any;

  cod_mon: string = "CLP";

  subscribe: Subscription;

  constructor(
    public _parametros: ParametrosService,
    public _usuario: UsuarioService
  ) {}

  ngOnInit() {
    let pais = "Chile";
    if (this._usuario.usuario.pais) {
      pais = this._usuario.usuario.pais;
    }
    console.log(pais);
    
    this.subscribe = this._parametros.observarTasa().subscribe((resp: any) => {
      this.p_tasa = resp;
      switch (pais) {
        case "Chile":
          this.tasa = parseFloat(resp.tasa);
          this.cod_mon = "CLP";
          break;
        case "Colombia":
          this.tasa = parseFloat(resp.colombia);
          this.cod_mon = "COP";
          break;
        case "Argentina":
          this.tasa = parseFloat(resp.argentina);
          this.cod_mon = "ARS";
          break;
        default:
          break;
      }
      this.calculaBolivares();
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  calculaBolivares() {
    if (this._usuario.usuario.pais === "Chile") {
      this.tasa = parseFloat(this.p_tasa.tasa);
    }
    if (this._usuario.usuario.pais === "Argentina") {
      this.tasa = parseFloat(this.p_tasa.argentina);
    }
    if (this._usuario.usuario.pais === "Colombia") {
      this.tasa = parseFloat(this.p_tasa.colombia);
      this.bolivares = this.pesos / this.tasa;
      this.bolivares = Math.round(this.bolivares * 100) / 100.0;
      return this.bolivares;
    }
    this.bolivares = this.pesos * this.tasa;
    this.bolivares = Math.round(this.bolivares * 100) / 100.0;
    return this.bolivares;
  }

  carculaPesos() {
    this.pesos = Math.round(this.bolivares / this.tasa);
  }

  mostrarTasa() {
    if (this.tasa) {
      if (this._usuario.usuario.pais === "chile") {
        this.tasa = parseFloat(this.p_tasa.tasa);
        return this.tasa.toLocaleString();
      }
      if (this._usuario.usuario.pais === "argentina") {
        this.tasa = parseFloat(this.p_tasa.argentina);
        return this.tasa.toLocaleString();
      }
      if (this._usuario.usuario.pais === "colombia") {
        this.tasa = parseFloat(this.p_tasa.colombia);
        return this.tasa.toLocaleString();
      }
      this.calculaBolivares();
    }
  }

  codMon() {
    if (this._usuario.usuario.pais === "chile") {
      return "CLP";
    }
    if (this._usuario.usuario.pais === "argentina") {
      return "ARS";
    }
    if (this._usuario.usuario.pais === "colombia") {
      return "COP";
    }
  }
}

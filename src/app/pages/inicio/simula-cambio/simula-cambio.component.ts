import { Component, OnInit, OnDestroy } from "@angular/core";
import { ParametrosService } from "../../../services/parametros.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-simula-cambio",
  templateUrl: "./simula-cambio.component.html",
  styleUrls: ["./simula-cambio.component.css"]
})
export class SimulaCambioComponent implements OnInit, OnDestroy {
  pesos: number = 10000;

  bolivares: number;

  tasa: number;

  subscribe: Subscription;

  constructor(public _parametros: ParametrosService) {}

  ngOnInit() {
    this.subscribe = this._parametros
      .observarTasa()
      .subscribe((resp: string) => {
        this.tasa = parseFloat(resp);
        // this.pesos = "15000";
        this.calculaBolivares();
      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  calculaBolivares() {
    this.bolivares = this.pesos * this.tasa;
    this.bolivares = Math.round(this.bolivares * 100) / 100.0;
  }

  carculaPesos() {
    this.pesos = Math.round(this.bolivares / this.tasa);
  }

  mostrarTasa() {
    return this.tasa.toLocaleString();
  }
}

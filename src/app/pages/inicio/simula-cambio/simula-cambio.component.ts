import { Component, OnInit, OnDestroy } from "@angular/core";
import { ParametrosService } from "../../../services/parametros.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-simula-cambio",
  templateUrl: "./simula-cambio.component.html",
  styleUrls: ["./simula-cambio.component.css"]
})
export class SimulaCambioComponent implements OnInit, OnDestroy {
  pesos: string = "10000";

  bolivares: string;

  tasa: string;

  subscribe: Subscription;

  constructor(public _parametros: ParametrosService) {}

  ngOnInit() {
    this.subscribe = this._parametros
      .observarTasa()
      .subscribe((resp: string) => {
        this.tasa = resp;
        // this.pesos = "15000";
        this.calculaBolivares();
      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  calculaBolivares() {
    this.bolivares = (
      Number.parseFloat(this.pesos) * Number.parseFloat(this.tasa)
    ).toString();
  }

  carculaPesos() {
    this.pesos = (
      Number.parseFloat(this.bolivares) / Number.parseFloat(this.tasa)
    ).toString();
  }
}

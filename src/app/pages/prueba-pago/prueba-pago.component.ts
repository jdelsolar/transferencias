import { Component, OnInit } from "@angular/core";
import { PagosService } from "src/app/services/pagos.service";

declare function crear_boton(resp);

@Component({
  selector: "app-prueba-pago",
  templateUrl: "./prueba-pago.component.html",
  styleUrls: ["./prueba-pago.component.css"]
})
export class PruebaPagoComponent implements OnInit {
  constructor(public _pagos: PagosService) {}

  ngOnInit() {}

  simularPago() {
    this._pagos.iniciarPago().then((resp: any) => {
      crear_boton(resp);
    });
  }
}

import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { TransferenciasService } from "src/app/services/transferencias.service";

@Component({
  selector: "app-bloque",
  templateUrl: "./bloque.component.html",
  styleUrls: ["./bloque.component.css"]
})
export class BloqueComponent implements OnInit {
  @Input() bloque: any;

  _forma = true;

  constructor(public _transferencias: TransferenciasService) {}

  ngOnInit() {}

  ocultarForma() {
    this._forma = true;
  }
  mostrarForma() {
    this._forma = false;
  }
}

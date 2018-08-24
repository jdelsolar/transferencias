import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { TransferenciasService } from "../../services/transferencias.service";

@Component({
  selector: "app-abono",
  templateUrl: "./abono.component.html",
  styleUrls: ["./abono.component.css"]
})
export class AbonoComponent implements OnInit {
  imagen: string = null;
  pesos: number = 0;
  tasa: number = 371;
  bolivares: number = 0;
  gastos: number = 1000;

  transferi: boolean = false;

  constructor(
    public _usuario: UsuarioService,
    public _transferencias: TransferenciasService
  ) {}

  ngOnInit() {}

  calcular() {
    this.bolivares = this.pesos * this.tasa + this.gastos;
  }

  seleccionarImagen(img: any) {
    if (img) {
      if (img.type.indexOf("image") >= 0) {
        let reader = new FileReader();
        let urlTemp = reader.readAsDataURL(img);

        reader.onloadend = () => {
          this.imagen = reader.result.toString();
        };
      }
    }
  }
}

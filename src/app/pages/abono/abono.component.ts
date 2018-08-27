import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { TransferenciasService } from "../../services/transferencias.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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

  forma: FormGroup;

  constructor(
    public _usuario: UsuarioService,
    public _transferencias: TransferenciasService
  ) {}

  ngOnInit() {

    this.forma = new FormGroup({
      monto: new FormControl( null, [Validators.required, Validators.min(10000)] ),
      tasa: new FormControl(),
      montofinal: new FormControl(),
      pais: new FormControl( "Venezuela", Validators.required ),
      nombre: new FormControl( null, [Validators.required, Validators.minLength(3)] ),
      ci: new FormControl( null, [Validators.required] ),
      banco: new FormControl(null, Validators.required),
      tipocuenta: new FormControl( null, Validators.required ),
      ncuenta: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      declaro: new FormControl( false )
    });
  }

  enviar() {
    console.log(this.forma.valid);
    
    console.log(this.forma);
    
  }

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

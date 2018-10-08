import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  TransferenciasService,
  Destinatario
} from "../../../services/transferencias.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../../../services/usuario.service";

@Component({
  selector: "app-destinatario",
  templateUrl: "./destinatario.component.html",
  styleUrls: ["./destinatario.component.css"]
})
export class DestinatarioComponent implements OnInit {
  forma: FormGroup;
  @Output() destinatario: EventEmitter<Destinatario> = new EventEmitter();
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public _transferencias: TransferenciasService,
    public _usuario: UsuarioService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl("", Validators.required),
      ci: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.email]),
      banco: new FormControl("", Validators.required),
      tipo_cuenta: new FormControl("", Validators.required),
      ncuenta: new FormControl("", Validators.required)
    });
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

  guardarDestinatario() {
    if (this.forma.valid) {
      let destinatario: Destinatario = {
        banco: this.forma.get("banco").value,
        ci: this.forma.get("ci").value,
        id_usuario: this._usuario.usuario.id_usuario,
        tipo_cuenta: this.forma.get("tipo_cuenta").value,
        nombre: this.forma.get("nombre").value,
        correo: this.forma.get("correo").value,
        ncuenta: this.forma.get("ncuenta").value,
        pais: "Venezuela"
      };

      this._transferencias.agregarDestinatario(destinatario).subscribe(
        (resp: any) => {
          if (resp.respuesta) {
            this.destinatario.emit(resp.destinatario);
            swal("Se creó su destinatario correctamente");
          } else {
            swal(resp.mensaje);
          }
        },
        err => {
          swal("Ocurrió un error");
        }
      );
    }
  }
}

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VendedorComponent } from "../../vendedor.component";
import { TransferenciasService } from "src/app/services/transferencias.service";

@Component({
  selector: "app-destinatario-vendedor",
  templateUrl: "./destinatario-vendedor.component.html",
  styleUrls: ["./destinatario-vendedor.component.css"]
})
export class DestinatarioVendedorComponent implements OnInit {
  @Output() ocultarDestinatario: EventEmitter<boolean> = new EventEmitter();
  @Output() idDestinatario: EventEmitter<string> = new EventEmitter();

  forma: FormGroup;

  cargando: boolean = false;

  constructor(
    public vendedor: VendedorComponent,
    public transferencias: TransferenciasService
  ) {}

  ngOnInit() {
    if (!this.vendedor.vendedor.vendedor.id) {
      return;
    }

    // `id`, `pais`, `nombre`, `ci`, `banco`, `tipo_cuenta`, `ncuenta`, `correo`, `fecha`, `id_usuario`, `activo`, `id_vendedor`
    this.forma = new FormGroup({
      nombre: new FormControl("", Validators.required),
      ci: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.email]),
      banco: new FormControl("", Validators.required),
      ncuenta: new FormControl("", Validators.required),
      id_vendedor: new FormControl(this.vendedor.vendedor.vendedor.id)
    });
  }

  ocultar() {
    this.ocultarDestinatario.emit(false);
  }

  enviar() {
    this.cargando = true;
    this.vendedor.vendedor
      .insertDestinatario(this.forma.value)
      .then((resp: any) => {
        this.vendedor.vendedor.lista_destinatarios().then( () => {
          this.idDestinatario.emit(resp.id_destinatario);
          this.cargando = false;
        });
      })
      .catch(() => {
        this.cargando = false;
        swal("Error al grabar el destinatario");
      });
  }
}

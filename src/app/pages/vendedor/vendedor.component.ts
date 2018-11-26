import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendedorService } from "src/app/services/vendedor.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-vendedor",
  templateUrl: "./vendedor.component.html",
  styleUrls: ["./vendedor.component.css"]
})
export class VendedorComponent implements OnInit, OnDestroy {
  sub: Subscription;
  tasa: string;
  porc: string;

  constructor(public vendedor: VendedorService) {}

  ngOnInit() {
    this.sub = this.vendedor.observarParams().subscribe((resp: any) => {
      this.tasa = resp.tasa;
      this.porc = resp.vendedor;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

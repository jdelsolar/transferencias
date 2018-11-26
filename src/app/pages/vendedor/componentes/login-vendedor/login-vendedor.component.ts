import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VendedorService } from "src/app/services/vendedor.service";

@Component({
  selector: "app-login-vendedor",
  templateUrl: "./login-vendedor.component.html",
  styleUrls: ["./login-vendedor.component.css"]
})
export class LoginVendedorComponent implements OnInit {
  forma: FormGroup;

  constructor(public vendedor: VendedorService) {
    this.forma = new FormGroup({
      correo: new FormControl("", [Validators.required, Validators.email]),
      clave: new FormControl("", Validators.required)
    });
  }

  login() {
    console.log("entro");

    this.vendedor.login(this.forma.value);
  }

  ngOnInit() {}
}

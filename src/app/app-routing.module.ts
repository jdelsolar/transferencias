import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { CompaniaComponent } from "./pages/compania/compania.component";
import { ComoComponent } from "./pages/como/como.component";
import { ContactoComponent } from "./pages/contacto/contacto.component";
import { TransferenciasComponent } from "./pages/transferencias/transferencias.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { RecuperarComponent } from "./pages/recuperar/recuperar.component";
import { Abono2Component } from "./pages/abono2/abono2.component";
import { PruebaPagoComponent } from "./pages/prueba-pago/prueba-pago.component";
import { FinalizadoComponent } from "./pages/finalizado/finalizado.component";
import { VendedorComponent } from "./pages/vendedor/vendedor.component";
import { LoginVendedorComponent } from "./pages/vendedor/componentes/login-vendedor/login-vendedor.component";

const app_routes: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "pais/:pais", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "compania", component: CompaniaComponent },
  { path: "como", component: ComoComponent },
  { path: "contacto", component: ContactoComponent },
  { path: "abono", component: Abono2Component },
  { path: "transferencias", component: TransferenciasComponent },
  { path: "recuperar", component: RecuperarComponent },
  { path: "prueba", component: PruebaPagoComponent },
  { path: "finalizado", component: FinalizadoComponent },
  { path: "vendedor", component: VendedorComponent },
  { path: "login-vendedor", component: LoginVendedorComponent },
  { path: "**", pathMatch: "full", redirectTo: "inicio" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(app_routes, {
      useHash: true,
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

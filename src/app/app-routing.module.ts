import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { CompaniaComponent } from "./pages/compania/compania.component";
import { ComoComponent } from "./pages/como/como.component";
import { ContactoComponent } from "./pages/contacto/contacto.component";
import { AbonoComponent } from "./pages/abono/abono.component";
import { TransferenciasComponent } from "./pages/transferencias/transferencias.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { RecuperarComponent } from "./pages/recuperar/recuperar.component";


const app_routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "compania", component: CompaniaComponent },
  { path: "como", component: ComoComponent },
  { path: "contacto", component: ContactoComponent },
  { path: "abono", component: AbonoComponent },
  { path: "transferencias", component: TransferenciasComponent },
  { path: "recuperar", component: RecuperarComponent },
  { path: "**", pathMatch: "full", redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { useHash: true })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

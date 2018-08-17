import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";

const app_routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "**", pathMatch: "full", redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { useHash: true })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

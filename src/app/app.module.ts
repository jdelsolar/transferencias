import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniaComponent } from './pages/compania/compania.component';
import { ComoComponent } from './pages/como/como.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AbonoComponent } from './pages/abono/abono.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SimulaCambioComponent } from './pages/inicio/simula-cambio/simula-cambio.component';
import { LoginInicioComponent } from './pages/inicio/login-inicio/login-inicio.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { DestinatarioComponent } from './shared/destinatario/destinatario.component';
import { ChpPipe } from './pipes/chp.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistroComponent,
    LoginComponent,
    CompaniaComponent,
    ComoComponent,
    ContactoComponent,
    AbonoComponent,
    TransferenciasComponent,
    InicioComponent,
    SimulaCambioComponent,
    LoginInicioComponent,
    RecuperarComponent,
    DepositoComponent,
    DestinatarioComponent,
    ChpPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

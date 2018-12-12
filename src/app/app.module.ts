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
import { ChpPipe } from './pipes/chp.pipe';
import { ImagenPipe } from './pipes/imagen.pipe';
import { Abono2Component } from './pages/abono2/abono2.component';
import { DestinatarioComponent } from './pages/abono2/destinatario/destinatario.component';
import { PruebaPagoComponent } from './pages/prueba-pago/prueba-pago.component';
import { FinalizadoComponent } from './pages/finalizado/finalizado.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { BloqueComponent } from './pages/vendedor/componentes/bloque/bloque.component';
import { LoginVendedorComponent } from './pages/vendedor/componentes/login-vendedor/login-vendedor.component';
import { DestinatarioVendedorComponent } from './pages/vendedor/componentes/destinatario-vendedor/destinatario-vendedor.component';


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
    ChpPipe,
    ImagenPipe,
    Abono2Component,
    DestinatarioComponent,
    PruebaPagoComponent,
    FinalizadoComponent,
    VendedorComponent,
    BloqueComponent,
    LoginVendedorComponent,
    DestinatarioVendedorComponent,
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

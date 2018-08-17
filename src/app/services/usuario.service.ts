import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api: string = "http://localhost/transferencias_rest/index.php";

  constructor( private http: HttpClient ) { 


  }

  guardarUsuario( usuario: Usuario ){

    return this.http.post( this.api + '/usuario/agregar_usuario', usuario );

  }

  

}


export interface Usuario {
  correo?: string;
  clave?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  pais?: string;
}
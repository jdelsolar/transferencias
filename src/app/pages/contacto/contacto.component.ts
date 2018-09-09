import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  forma: FormGroup;

  constructor( public _contacto:ContactoService ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      nacionalidad: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });

  }

  enviar() {
    if (this.forma.valid){

      this._contacto.mensaje = {
        nombre: this.forma.get('nombre').value,
        email: this.forma.get('email').value,
        asunto: this.forma.get('asunto').value,
        nacionalidad: this.forma.get('nacionalidad').value,
        mensaje: this.forma.get('mensaje').value
      };

      this._contacto.enviar();

    }
  }

}

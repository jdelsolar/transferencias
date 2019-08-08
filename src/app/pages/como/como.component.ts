import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-como',
  templateUrl: './como.component.html',
  styleUrls: ['./como.component.css']
})
export class ComoComponent implements OnInit {

  constructor(public _us: UsuarioService) { }

  ngOnInit() {
  }

}

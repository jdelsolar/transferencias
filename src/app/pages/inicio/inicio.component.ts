import { Component, OnInit } from '@angular/core';

declare function init_collapse();

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_collapse();
  }

}

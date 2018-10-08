import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-abono2',
  templateUrl: './abono2.component.html',
  styleUrls: ['./abono2.component.css']
})
export class Abono2Component implements OnInit {
  @ViewChild('btnModalDestinatarios') btnModalDestinatarios: ElementRef;

  constructor() { }

  ngOnInit() {
    this.btnModalDestinatarios.nativeElement.click();
  }

  cerrarModal() {
    this.btnModalDestinatarios.nativeElement.click();
  }

  modalDestinatario(destinatario) {
    console.log("destinatario");
    console.log(destinatario);
    this.btnModalDestinatarios.nativeElement.click();
  }

}

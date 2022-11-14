import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    console.log('Valor', valor);
    this.txtBuscar.nativeElement.value = '';
  }

  constructor() {
    
   }

  ngOnInit(): void {
  }

}

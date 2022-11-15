import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs( query:string ){
    // transformamos la consulta a minúsculas
    // comprobamos que no hay otra búsqueda realizada antes igual
    // añadimos la busqueda al inicio del arreglo
    // cortamos el arreglo a diez elementos

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    
    console.log('consulta:', this.historial);
  }

  constructor() { }
}

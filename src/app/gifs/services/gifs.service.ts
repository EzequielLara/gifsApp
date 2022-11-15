import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'qejB6cG33Lu4fL6KoHp8Yh2T75HfLV22';
  private _historial:string[] = [];

  public resultados:any[]=[];

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

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=qejB6cG33Lu4fL6KoHp8Yh2T75HfLV22&q=${query}&limit=10`)
      .subscribe( (response:any)=>{
         console.log(response.data);
         this.resultados = response.data;
        });
    }

  constructor(private http:HttpClient) { }
}

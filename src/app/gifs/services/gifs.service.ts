import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interfaces/gif.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'qejB6cG33Lu4fL6KoHp8Yh2T75HfLV22';
  private _historial:string[] = [];

  public resultados:Gif[]=[];
  
  constructor(private http:HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
   }


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

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    this.http.get<SearchGifResponse>(`https://api.giphy.com/v1/gifs/search?api_key=qejB6cG33Lu4fL6KoHp8Yh2T75HfLV22&q=${query}&limit=10`)
      .subscribe( (response:SearchGifResponse)=>{
         console.log(response);
         this.resultados = response.data;
        });
    }

}

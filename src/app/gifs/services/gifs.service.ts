import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interfaces/gif.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl:string = 'https://api.giphy.com/v1/gifs'; 
  private apiKey:string = 'qejB6cG33Lu4fL6KoHp8Yh2T75HfLV22';
  private _historial:string[] = [];

  public resultados:Gif[]=[];
  
  constructor(private http:HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
   }


  get historial(){
    return [...this._historial];
  }

  buscarGifs( query:string ){
    // comprobamos que no hay otra búsqueda realizada antes igual
    // transformamos la consulta a minúsculas
    // añadimos la busqueda al inicio del arreglo
    // cortamos el arreglo a diez elementos
    // añadimos los elementos del historial al localstorage
    // hacemos la petición http para extraer la data con limite de 10 elementos
    // añadimos los elementos al localstorage.

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial)); 
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    
    this.http.get<SearchGifResponse>(`${this.servicioUrl}/search`, {params : params})
    .subscribe( (response:SearchGifResponse)=>{
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
    }

}

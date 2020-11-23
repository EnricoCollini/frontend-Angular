import { IPunto } from './punto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "http://localhost:8080/";

  getPuntiFromDB() : Observable<IPunto[]>{
    return this.http.get<IPunto[]>("project/rest/puntointeressegenerico/puntiinteressegenerici");
  }

  getPuntoWithId(id): Observable<IPunto>{
    return this.http.get<IPunto>('project/rest/puntointeressegenerico/get/id'+id);
  }

  postNewPunto(data) : Observable<any>{
    const body = data;
    return this.http.post("project/rest/puntointeressegenerico/create",body);
  }

  deletePunto(id) : Observable<any>{
    const lid = id;
    const lurl = ("project/rest/puntointeressegenerico/delete/id/" + lid);
    return this.http.get(lurl);
  }

}

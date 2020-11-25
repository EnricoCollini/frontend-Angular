import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAreaNaturale } from './areanturale';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaNaturaleService {

  constructor(private http: HttpClient) { }

  private _baseUrl: string = "http://localhost:8080/";


  getAreeNaturali(){
    return [
      {"id":1, "name":"AreaNaturale1", "description": "descrizione1"},
      {"id":1, "name":"AreaNaturale2", "description": "descrizione2"},
      {"id":1, "name":"AreaNaturale3", "description": "descrizione3"},
      {"id":1, "name":"AreaNaturale4", "description": "descrizione4"},
      {"id":1, "name":"AreaNaturale5", "description": "descrizione5"}
    ]
  }

  getAreeNaturaliFromDB(): Observable<IAreaNaturale[]>{
    return this.http.get<IAreaNaturale[]>('project/rest/areanaturale/areenaturali')
    .pipe(catchError(this.errorHandler));
  }

  getAreaNaturaleWithId(id): Observable<IAreaNaturale>{
    return this.http.get<IAreaNaturale>("project/rest/areanaturale/get/id/"+id);
  }

  postNewAreaNaturale(data, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const body = data;
    return this.http.post('project/rest/areanaturale/create',body, header)
    .pipe(catchError(this.errorHandler));
  }

  deleteAreaNaturale(id, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const lid = id;
    const lurl = ('project/rest/areanaturale/delete/id/' + lid);
    console.log(lurl);
    return this.http.get(lurl, header);
  }

  getRistoAssociati(id): Observable<any>{
    return this.http.get(("project/rest/areanaturale/ristoAssociati/"+id));
  }

  getItiAssociati(id): Observable<any>{
    return this.http.get(("project/rest/areanaturale/itiAssociati/"+id));
  }

  getPuntiAssociati(id): Observable<any>{
    return this.http.get(("project/rest/areanaturale/puntiAssociati/"+id));
  }

  getStruttureAssociati(id): Observable<any>{
    return this.http.get(("project/rest/areanaturale/struttureAssociati/"+id));
  }

  errorHandler(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

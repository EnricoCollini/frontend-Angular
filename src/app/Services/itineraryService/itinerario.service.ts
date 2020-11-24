import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IItinerario } from './itinerario';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(private http: HttpClient) { }

  private _baseUrl: string = "http://localhost:8080/";

  getItinerariFromDB(): Observable<IItinerario[]>{
    return this.http.get<IItinerario[]>('project/rest/itinerario/itinerari')
    .pipe(catchError(this.errorHandler));
  }

  getItinerarioWithId(id): Observable<IItinerario>{
    return this.http.get<IItinerario>('project/rest/itinerario/get/id/'+id);
  }

  deleteItinerario(id, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const lid = id;
    const lurl = ('project/rest/itinerario/delete/id/' + lid);
    console.log(lurl);
    return this.http.get(lurl, header)
    .pipe(catchError(this.errorHandler));
  }

  postNewItinerario(data,jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const body = data;
    return this.http.post('project/rest/itinerario/create', body, header)
    .pipe(catchError(this.errorHandler));
  }

  getRistoAssociati(id): Observable<any>{
    return this.http.get(("project/rest/itinerario/ristoriAssociati/"+id));
  }

  getAreeAssociati(id): Observable<any>{
    return this.http.get(("project/rest/itinerario/areeAssociate/"+id));
  }

  getPuntiAssociati(id): Observable<any>{
    return this.http.get(("project/rest/itinerario/puntiAssociati/"+id));
  }

  getStruttureAssociati(id): Observable<any>{
    return this.http.get(("project/rest/itinerario/struttureAssociate/"+id));
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

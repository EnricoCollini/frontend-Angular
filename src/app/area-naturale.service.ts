import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

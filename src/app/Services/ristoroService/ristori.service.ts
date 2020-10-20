import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IRistoro } from './ristoro';


@Injectable({
  providedIn: 'root'
})
export class RistoriService {

  constructor(private http: HttpClient) { }

  private _baseUrl: string = "http://localhost:8080/";


  getRistoriFromDB(): Observable<IRistoro[]>{
    return this.http.get<IRistoro[]>('project/rest/ristoro/ristori')
    .pipe(catchError(this.errorHandler));
  }

  deleteRistoro(id): Observable<any>{
    const lid = id;
    const lurl = ('project/rest/ristoro/delete/id/' + lid);
    console.log(lurl);
    return this.http.get(lurl)
    .pipe(catchError(this.errorHandler));
  }


  postNewRistoro(data): Observable<any>{
    const body = data;
    return this.http.post('project/rest/ristoro/create', body)
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

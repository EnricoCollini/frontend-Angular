import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  getRistoroWithId(id): Observable<IRistoro>{
    return this.http.get<IRistoro>('project/rest/ristoro/get/id/'+id);
  }

  deleteRistoro(id, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const lid = id;
    const lurl = ('project/rest/ristoro/delete/id/' + lid);
    console.log(lurl);
    return this.http.get(lurl, header)
    .pipe(catchError(this.errorHandler));
  }

  associaAdmin(ristoid, adminid, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    return this.http.get("project/rest/ristoro/associaAmministratore/" + ristoid + "/" + adminid, header);
  }


  postNewRistoro(data, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const body = data;
    return this.http.post('project/rest/ristoro/create', body, header)
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import {IStrutturaRicettiva} from './strutturaricettiva';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StruttureRicettiveService {

  constructor(private http: HttpClient) { }
  private _baseUrl: string = "http://localhost:8080/";


  getStruttureRicettiveFromDB(): Observable<IStrutturaRicettiva[]>{
    return this.http.get<IStrutturaRicettiva[]>('project/rest/strutturaricettiva/strutturericettive')
    .pipe(catchError(this.errorHandler));
  }

  associaAdmin(strid, adminid, jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    return this.http.get("project/rest/strutturaricettiva/associaAmministratore/" + strid + "/" + adminid, header);
  }

  getStrutturaWithId(id): Observable<IStrutturaRicettiva>{
    return this.http.get<IStrutturaRicettiva>('project/rest/strutturaricettiva/get/id/'+ id);
  }

  deleteStruttura(id,jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const lid = id;
    const lurl = ('project/rest/strutturaricettiva/delete/id/' + lid);
    console.log(lurl);
    return this.http.get(lurl, header)
    .pipe(catchError(this.errorHandler));
  }


  postNewStrutturaRicettiva(data,jwt): Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${jwt}`)
    }
    const body = data;
    return this.http.post('project/rest/strutturaricettiva/create',body, header)
    pipe(catchError(this.errorHandler));
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AmministratoreService {

  constructor(private http: HttpClient) { }

  private _baseUrl: string = "http://localhost:8080/";

  postGenNewToken(data): Observable<any>{
    const body = data;
    return this.http.post('project/rest/auth/genTokenForUser', body)
  }


}

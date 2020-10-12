import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItineraryMakerService {
  protected _token = "5b3ce3597851110001cf62484048962837b0430e9245b2df426f8106";

  constructor(private http: HttpClient) {   }

  getItinerario(startLat: number, startLon: number, endLat: number, endLon: number){
    let urlString = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" +  this._token + "&start=" + startLat + "," + startLon + "&end=" + endLat + "," + endLon;
    return this.http.get(urlString);
  }

  
}

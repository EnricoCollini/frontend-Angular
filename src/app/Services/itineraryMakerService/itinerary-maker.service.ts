import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { openroute } from 'src/environments/openrouteenv';

@Injectable({
  providedIn: 'root'
})
export class ItineraryMakerService {

  protected _token = openroute.openRouteServices.key;


  public  mapsIcon = L.icon({    
    iconUrl:  "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg", 
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });
  public  intIcon = L.icon({
    iconUrl:  "https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-vector-flag-icon-png-image_762945.jpg",  
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });
  public  startIcon = L.icon({
    iconUrl:  "https://image.shutterstock.com/image-vector/start-icon-symbol-flat-vector-260nw-270857945.jpg",  
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });
  public  endIcon = L.icon({
    iconUrl:  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTU5GDZLT6b6IZq1JqxcLgSmqc3cHLafYVSnA&usqp=CAU",  
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  constructor(private http: HttpClient) {   }

  getItinerario(startLat: number, startLon: number, endLat: number, endLon: number){
    console.log(this._token);
    let urlString = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" +
      this._token + "&start=" + startLat + "," + startLon + "&end=" + endLat + "," + endLon;
    return this.http.get(urlString);
  }

  getCoordinates(indirizzo: string){
    console.log(this._token);
    let urlString = "https://api.openrouteservice.org/geocode/search?api_key="+ this._token + "&text=" + indirizzo;
    return this.http.get(urlString);
  }

  getMapsIcon(){
    return(this.mapsIcon);
  }

  getIntIcon(){
    return(this.intIcon);
  }

  getStartIcon(){
    return(this.startIcon);
  }

  getFinishIcon(){
    return(this.endIcon);
  }

  
}

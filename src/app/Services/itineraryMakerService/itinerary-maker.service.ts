import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ItineraryMakerService {
  protected _token = "5b3ce3597851110001cf62484048962837b0430e9245b2df426f8106";

  public  greenIcon = L.icon({
    iconUrl:  "https://pngimage.net/wp-content/uploads/2018/06/flat-tree-png-2.png", 
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
    let urlString = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" +  this._token + "&start=" + startLat + "," + startLon + "&end=" + endLat + "," + endLon;
    return this.http.get(urlString);
  }

  getMapsIcon(){
    return(this.greenIcon);
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

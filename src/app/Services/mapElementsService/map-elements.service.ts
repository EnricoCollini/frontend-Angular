import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapElementsService {

  public tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  public  greenIcon = L.icon({
    iconUrl:  "https://pngimage.net/wp-content/uploads/2018/06/flat-tree-png-2.png", 
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  public  mapsIcon = L.icon({
    iconUrl:  "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg", 
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });
  
  public  itiIcon = L.icon({
    iconUrl:  "https://image.flaticon.com/icons/png/512/1072/1072374.png",
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  public  struttIcon = L.icon({
    iconUrl:  "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/house-icon.png",
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  public  ristoIcon = L.icon({
    iconUrl:  "https://www.flaticon.com/svg/static/icons/svg/227/227326.svg",
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  public  puntoIcon = L.icon({
    iconUrl:  "https://toppng.com/uploads/preview/map-point-google-map-marker-gif-11562858751s4qufnxuml.png",
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  

  public popup: string;

  constructor() { }

  getAreeIcon(){
    return(this.greenIcon); 
  }

  getMapsIcon(){
    return(this.mapsIcon);
  }

  getRistoIcon(){
    return(this.ristoIcon);
  }

  getStruttIcon(){
    return (this.struttIcon);
  }

  getPuntoIcon(){
    return (this.puntoIcon);
  }

  getItinIcon(){
    return (this.itiIcon);
  }

  getTile(){
    return(this.tile);
  }

  getPopupNav(name, center){
    this.popup = ""
    + ' <div class="card"> ' 
    +  '<div class="card-body">'
    +  '<h5 class="card-subtitle">'+ name +'</h5> <br>'
    + '<a class="card-link" href="https://www.google.it/maps/?q='+ center+  '" target="_blank">Indicazioni</a>'
    + '</div> '
    + '</div> ';
    return(this.popup);
  }

  getPopup(name){
    this.popup = ' <div class="card"> ' 
    +  '<div class="card-body">'
      +  '<h5 class="card-subtitle">'+ name +'</h5> <br>'
      + '<a class="card-link" href="http://localhost:4200/redirect/' + name + '">View More</a>'
    + '</div> '
  + '</div> '
    return(this.popup);
  }

}

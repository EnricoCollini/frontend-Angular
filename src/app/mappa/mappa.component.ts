import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {
  @Input() center: [0,0];
  @Input() name: "Hello";
  public popup: string;



  public map: L.Map;
  public zoom: number;
  public  greenIcon = L.icon({
    iconUrl:  "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg",  
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });

  constructor() { }

  ngOnInit() {


    this.popup = ""
    + ' <div class="card"> ' 
    +  '<div class="card-body">'
    +  '<h5 class="card-subtitle">'+ this.name +'</h5> <br>'
    + '<a class="card-link" href="https://www.google.it/maps/?q='+ this.center+  '" target="_blank">Indicazioni</a>'
    + '</div> '
    + '</div> ';

    this.map = L.map('map').setView(this.center, 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker(this.center, {icon: this.greenIcon})
    .bindPopup(this.popup)
    .addTo(this.map);
  }

}

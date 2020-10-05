import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})

export class RicercaComponent implements OnInit {

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
    this.map = L.map('map').setView([43, 11], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([43, 11], {icon: this.greenIcon}).bindPopup('<b>Hello!!</b>').addTo(this.map);
  }
 
}



 


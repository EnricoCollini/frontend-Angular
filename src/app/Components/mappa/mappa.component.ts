import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {
  @Input() center: [0,0];
  @Input() name: "Hello";
  @Input() iti;
  private popup: string;
  private map: L.Map;
  private zoom: number;
  private greenIcon: L.Icon;
  private tile: L.TileLayer;

  constructor(private _mapElementsService: MapElementsService) { }

  ngOnInit() {
    this.map = L.map('map').setView(this.center, 16);
    this.greenIcon = this._mapElementsService.getMapsIcon();
    
    this.tile = this._mapElementsService.getTile();
    this.tile.addTo(this.map);

    this.popup = this._mapElementsService.getPopupNav(this.name, this.center);

    L.marker(this.center, {icon: this.greenIcon})
    .bindPopup(this.popup)
    .addTo(this.map);
    
    L.geoJSON(JSON.parse(this.iti)).addTo(this.map);
  }

}

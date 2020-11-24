import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ItineraryMakerService } from 'src/app/Services/itineraryMakerService/itinerary-maker.service';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';

@Component({
  selector: 'app-itinerary-maker2',
  templateUrl: './itinerary-maker2.component.html',
  styleUrls: ['./itinerary-maker2.component.css']
})
export class ItineraryMaker2Component implements OnInit {
  private isItinerarioPresente = false;
  private isPartenzaSet = false;
  private isArrivoSet = false;
  private numberPuntiIntermediSet = 0;
  public itinerario = [];

  public map: L.Map;
  public zoom: number;
  public  startIcon : L.Icon;
  public  endIcon : L.Icon;
  public intIcon: L.Icon;
  private partenza: L.Marker;
  private arrivo: L.Marker;
  private partenzaPlaceholder = "SetStart: Via, Città, ..."
  private arrivoPlaceholder = "SetFinish: Via, Città, ..."

  private puntiIntermediIds: number[] = [];
  private tmpMarker: L.Marker;
  private puntiIntermedi: L.Marker[] = [];
  private tmpPlaceholder = "Via, Città, ..."

  private placeholders: string[] = [];
  private count = 1000;

  constructor( private _mapElementsService: MapElementsService,
    private _itinerarymakerservice: ItineraryMakerService) { }

  ngOnInit() {
    this.map = L.map('map').setView([43, 12], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.startIcon = this._itinerarymakerservice.getStartIcon()
    this.endIcon = this._itinerarymakerservice.getFinishIcon();
    this.intIcon = this._itinerarymakerservice.getIntIcon();
    this.tmpMarker = new L.Marker(new L.LatLng(0, 0));

  }

  submitSearch(form){
    let res = form.value;
    console.log(res.search)
    this._itinerarymakerservice.getCoordinates(res.search)
      .subscribe((data: any)  => {
        let coords = data.features[data.features.length -1].geometry.coordinates;

        let coord = [coords[1], coords[0]];
        console.log(coord);
        this.map.setView(<L.LatLngTuple>coord, 15);
        this.partenza =new L.Marker(new L.LatLng(coords[1], coords[0]),{icon: this.startIcon});
        this.partenza.addTo(this.map);
        this.partenzaPlaceholder = res.search;
        this.isPartenzaSet = true;
        form.reset();
      }
    );
  }
  submitSearch2(form){
    let res = form.value;
    console.log(res.search)
    this._itinerarymakerservice.getCoordinates(res.search)
      .subscribe((data: any)  => {
        let coords = data.features[data.features.length -1].geometry.coordinates;

        let coord = [coords[1], coords[0]];
        console.log(coord);
        this.map.setView(<L.LatLngTuple>coord, 15);
        this.arrivo =new L.Marker(new L.LatLng(coords[1], coords[0]),{icon: this.endIcon});
        this.arrivo.addTo(this.map);
        this.arrivoPlaceholder = res.search;
        this.isArrivoSet = true;
        form.reset();
      }
    );
  }

  submitSearch3(form, elementId){
    console.log(elementId);
    let res = form.value;
    console.log(res.search)
    this._itinerarymakerservice.getCoordinates(res.search)
      .subscribe((data: any)  => {
        let coords = data.features[data.features.length -1].geometry.coordinates;
        let coord = [coords[1], coords[0]];
        console.log(coord);
        this.map.setView(<L.LatLngTuple>coord, 15);
        this.tmpMarker =new L.Marker(new L.LatLng(coords[1], coords[0]),{icon: this.intIcon});
        this.puntiIntermedi[elementId%1000] = this.tmpMarker;
        this.placeholders[elementId%1000] = res.search;
        this.puntiIntermedi[elementId%1000].addTo(this.map);
        this.numberPuntiIntermediSet = this.numberPuntiIntermediSet + 1;
        form.reset();
      }
    );
  }

  elimina(value, form){
    if(value == 999){ //partenza
      this.map.removeLayer(this.partenza);
      this.partenzaPlaceholder =  "SetStart: Via, Città, ...";
      this.isPartenzaSet = false;
      form.reset();
    }else{
      if(value == 2000){ //arrivo
        this.map.removeLayer(this.arrivo);
        this.arrivoPlaceholder =  "SetFinish: Via, Città, ...";
        this.isArrivoSet = false;
        form.reset();
      }else{
        this.map.removeLayer(this.puntiIntermedi[value%1000]);
        this.puntiIntermedi.splice(value%1000,1);
        console.log("viosdf"+ this.puntiIntermediIds);
        this.puntiIntermediIds.splice(value%1000,1);
        console.log(this.placeholders);
        this.placeholders.splice(value%1000,1);
        console.log(this.placeholders);
        let tmp = [];
        for (let index = 0; index < this.puntiIntermediIds.length; index++) {
          tmp.push(1000+index);
        }
        console.log(this.puntiIntermediIds);
        this.puntiIntermediIds = tmp;
        console.log(this.puntiIntermediIds);
        this.count = this.count -1;
        this.numberPuntiIntermediSet = this.numberPuntiIntermediSet - 1;
        form.reset();
      }
    }

  }

  Aggiungi(){
    this.puntiIntermediIds.push(this.count);
    this.puntiIntermedi.push(this.tmpMarker);
    this.placeholders.push(this.tmpPlaceholder);
    console.log(this.puntiIntermediIds);
    this.count = this.count + 1;
  }



getRoute(){
  if(!this.isItinerarioPresente){
    let markers = [];
    markers.push(this.partenza);
    for (let index = 0; index < this.puntiIntermedi.length; index++) {
      markers.push(this.puntiIntermedi[index]);
    }
    markers.push(this.arrivo);
    for (let i = 0; i < markers.length-1; i++) {
      let j = i +1
      let startLat = markers[i].getLatLng().lat;
      let startLon = markers[i].getLatLng().lng;
      let endLat = markers[j].getLatLng().lat;
      let endLon = markers[j].getLatLng().lng;
      this._itinerarymakerservice.getItinerario(startLon, startLat,endLon , endLat )
        .subscribe(data => {
          let itiner = data;
          let itinerJ= JSON.stringify(itiner);
          this.itinerario.push(L.geoJSON(JSON.parse(itinerJ)));
          this.itinerario[this.itinerario.length-1].addTo(this.map);
        });
      this.isItinerarioPresente = true;
    }
  }else{
    for (let index = 0; index < this.itinerario.length; index++) {
      this.map.removeLayer(this.itinerario[index]);  
    }
    let markers = [];
    markers.push(this.partenza);
    for (let index = 0; index < this.puntiIntermedi.length; index++) {
      markers.push(this.puntiIntermedi[index]);
    }
    markers.push(this.arrivo);
    for (let i = 0; i < markers.length-1; i++) {
      let j = i +1
      let startLat = markers[i].getLatLng().lat;
      let startLon = markers[i].getLatLng().lng;
      let endLat = markers[j].getLatLng().lat;
      let endLon = markers[j].getLatLng().lng;
      this._itinerarymakerservice.getItinerario(startLon, startLat,endLon , endLat )
      .subscribe(data => {
        let itiner = data;
        let itinerJ= JSON.stringify(itiner);
        this.itinerario.push(L.geoJSON(JSON.parse(itinerJ)));
        this.itinerario[this.itinerario.length-1].addTo(this.map);
      });
    this.isItinerarioPresente = true;
    }  
  }    
  }

}
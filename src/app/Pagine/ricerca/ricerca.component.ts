import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, OnDestroy, AfterViewChecked, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { ItineraryMakerService } from 'src/app/Services/itineraryMakerService/itinerary-maker.service';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';
import { AreaNaturaleService } from '../../Services/areaNaturaleService/area-naturale.service';
import { ItinerarioService } from '../../Services/itineraryService/itinerario.service';
import { RistoriService } from '../../Services/ristoroService/ristori.service';
import { StruttureRicettiveService } from '../../Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})

export class RicercaComponent implements OnInit {
  public map: L.Map;
  public zoom: number;
  public  greenIcon : L.Icon;
  public  itiIcon : L.Icon;
  public  struttIcon : L.Icon;
  public  ristoIcon : L.Icon;

  public areeNaturali = [];
  public struttureRicettive = [];
  public ristori = [];
  public itinerari = [];

  public areeNaturaliMarkers = [];
  public ristoriMarkers = [];
  public struttureMarkers = [];
  public itinerariMarkers = [];

  constructor(
    private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService,
    private _ristoriService: RistoriService,
    private _itinerariService: ItinerarioService,
    private _mapElementsService: MapElementsService,
    private _itinerariMakerService: ItineraryMakerService) {}


  ngOnInit() {

    this.map = L.map('map').setView([43, 12], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.greenIcon = this._mapElementsService.getAreeIcon();
    this.itiIcon = this._mapElementsService.getItinIcon();
    this.ristoIcon = this._mapElementsService.getRistoIcon();
    this.struttIcon = this._mapElementsService.getStruttIcon();

    this._itinerariService.getItinerariFromDB()
      .subscribe(data =>{
        this.itinerari = data;
        this.createItinerariMarkers();
      });

    this._ristoriService.getRistoriFromDB()
      .subscribe(data =>{
        this.ristori = data;
        this.createRistoriMarkers();
      });

    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe(data => {
        this.areeNaturali = data;
        this.createAreeNaturaliMarkers();
      });

    this._struttureRicettiveService.getStruttureRicettiveFromDB()
      .subscribe(data=> {
        this.struttureRicettive = data
        this.createStruttureRicettiveMarkers();
      }); 
  }

  submitSearch(form){
    let res = form.value;
    console.log(res.search)
    this._itinerariMakerService.getCoordinates(res.search)
      .subscribe(data => {
        let coords = data.features[data.features.length -1].geometry.coordinates;
        let coord = [coords[1], coords[0]];
        console.log(coord);
        this.map.setView(<L.LatLngTuple>coord, 15);
        
      }
    );
  }

  createAreeNaturaliMarkers(){
    this.areeNaturaliMarkers = [];
    for (let index = 0; index < this.areeNaturali.length; index++) {
      let popup = this._mapElementsService.getPopup(this.areeNaturali[index].name); 
      let markerTmp = L.marker([this.areeNaturali[index].latitude, this.areeNaturali[index].longitude], {icon: this.greenIcon}).bindPopup(popup);
      this.areeNaturaliMarkers.push(markerTmp);
    }
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
    }
  }


  createItinerariMarkers(){
    this.itinerariMarkers = [];
    for (let index = 0; index < this.itinerari.length; index++) {
      let popup = this._mapElementsService.getPopup(this.itinerari[index].name); 
      let markerTmp = L.marker([this.itinerari[index].startlatitude, this.itinerari[index].endlongitude], {icon: this.itiIcon}).bindPopup(popup);
      this.itinerariMarkers.push(markerTmp);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.itinerariMarkers[index].addTo(this.map);
    }
  }

  createRistoriMarkers(){
    this.ristoriMarkers = [];
    for (let index = 0; index < this.ristori.length; index++) {
      let popup = this._mapElementsService.getPopup(this.ristori[index].name); 
      let markerTmp = L.marker([this.ristori[index].latitude, this.ristori[index].longitude], {icon: this.ristoIcon}).bindPopup(popup);
      this.ristoriMarkers.push(markerTmp);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.ristoriMarkers[index].addTo(this.map);
    }
  }

  createStruttureRicettiveMarkers(){
    this.struttureMarkers = [];
    for (let index = 0; index < this.struttureRicettive.length; index++) {
      let popup = this._mapElementsService.getPopup(this.struttureRicettive[index].name);
      let markerTmp = L.marker([this.struttureRicettive[index].latitude, this.struttureRicettive[index].longitude], {icon: this.struttIcon}).bindPopup(popup);
      this.struttureMarkers.push(markerTmp);
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.struttureMarkers[index].addTo(this.map);
    }
  }


  showOnlyAreeNaturali(){
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.map.removeLayer(this.struttureMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.map.removeLayer(this.ristoriMarkers[index]);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.map.removeLayer(this.itinerariMarkers[index]);
    }
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
    }
  }

  showOnlyStrutture(){
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.map.removeLayer(this.areeNaturaliMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.map.removeLayer(this.ristoriMarkers[index]);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.map.removeLayer(this.itinerariMarkers[index]);  
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.struttureMarkers[index].addTo(this.map);
    }
  }

  showOnlyRistori(){
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.map.removeLayer(this.areeNaturaliMarkers[index]);
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.map.removeLayer(this.struttureMarkers[index]);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.map.removeLayer(this.itinerariMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.ristoriMarkers[index].addTo(this.map);
    }
  }

  showOnlyItinerari(){
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.map.removeLayer(this.areeNaturaliMarkers[index]);
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.map.removeLayer(this.struttureMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.map.removeLayer(this.ristoriMarkers[index]);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.itinerariMarkers[index].addTo(this.map);
    }
  }

  showAll(){
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.map.removeLayer(this.struttureMarkers[index]);
    }
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.map.removeLayer(this.areeNaturaliMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.map.removeLayer(this.ristoriMarkers[index]);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.map.removeLayer(this.itinerariMarkers[index]);
    }
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.struttureMarkers[index].addTo(this.map);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.ristoriMarkers[index].addTo(this.map);
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.itinerariMarkers[index].addTo(this.map);
    }
  }

}
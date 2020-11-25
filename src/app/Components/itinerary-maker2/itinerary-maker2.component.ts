import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as togpx from 'togpx';
import { DomSanitizer } from '@angular/platform-browser';
import { ItineraryMakerService } from 'src/app/Services/itineraryMakerService/itinerary-maker.service';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';
import { IAreaNaturale } from 'src/app/Services/areaNaturaleService/areanturale';

@Component({
  selector: 'app-itinerary-maker2',
  templateUrl: './itinerary-maker2.component.html',
  styleUrls: ['./itinerary-maker2.component.css']
})
export class ItineraryMaker2Component implements OnInit {

  //variabili per gestire quando un itinerario è presente o si può creare
  private isItinerarioPresente = false;
  private isPartenzaSet = false;
  private isArrivoSet = false;
  private numberPuntiIntermediSet = 0;
  //variabili base per la creazione dell'itinerario
  public itinerario = [];
  private baseJson = {"type": "FeatureCollection", "features": []};
  private features = [];

  //variabili per la configurazione della mappa
  public map: L.Map;
  public zoom: number;
  public  startIcon : L.Icon;
  public  endIcon : L.Icon;
  public intIcon: L.Icon;
  private partenza: L.Marker;
  private arrivo: L.Marker;
  private partenzaPlaceholder = "SetStart: Via, Città, ..."
  private arrivoPlaceholder = "SetFinish: Via, Città, ..."
  //anche dei punti intermedi
  private puntiIntermediIds: number[] = [];
  private tmpMarker: L.Marker;
  private puntiIntermedi: L.Marker[] = [];
  private tmpPlaceholder = "Via, Città, ..."
  private placeholders: string[] = [];
  private count = 1000;

  //variabili per la gestione del marker di seleizone sulla mappa
  private assigned = false;
  private newMarker: L.Marker;

  //marker rappresentanti le aree naturali
  private areeNaturali: IAreaNaturale[] = [];
  private areeNaturaliMarkers: L.Marker[] = [];


  constructor( private _mapElementsService: MapElementsService,
    private _itinerarymakerservice: ItineraryMakerService,
    private sanitizer:DomSanitizer,
    private _areanaturaleservice: AreaNaturaleService) { }

  ngOnInit() {
    //prendiamo i markers delle aree naturali
    this._areanaturaleservice.getAreeNaturaliFromDB()
    .subscribe(data =>{
      this.areeNaturali = data;
      this.createAreeNaturaliMarkers();
      
    })

    //creiamo la mappa
    this.map = L.map('map').setView([43, 12], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.startIcon = this._itinerarymakerservice.getStartIcon()
    this.endIcon = this._itinerarymakerservice.getFinishIcon();
    this.intIcon = this._itinerarymakerservice.getIntIcon();
    this.tmpMarker = new L.Marker(new L.LatLng(0, 0));

    //evento per aggiungere markers sulla mappa al click
    this.map.on("click", <LeafletMouseEvent>(e) => {
      if(this.assigned){
        this.map.removeLayer(this.newMarker);
      }
      this.newMarker= L.marker(e.latlng ,  {icon: this._mapElementsService.getMapsIcon()} );
      let buttonPop = '<button class="partenza">Seleziona Partenza</button><br><button class="arrivo">Seleziona Arrivo</button><br><button class="intermedio">Aggiungi Punto Intermedio</button>';
      if(!this.isArrivoSet){
         buttonPop = '<button class="arrivo">Seleziona Arrivo</button>'
         this.newMarker.bindPopup(buttonPop)
      .on("popupopen",  (b) => {
        var popUp = b.target.getPopup()
        popUp.getElement()
        .querySelector(".arrivo  ")
        .addEventListener("click", e => {this.selArrivo(-1);}); });  
      }else{
        if(!this.isPartenzaSet){
          buttonPop ='<button class="partenza">Seleziona Partenza</button>'
          this.newMarker.bindPopup(buttonPop)
      .on("popupopen",  (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
        .querySelector(".partenza  ")
        .addEventListener("click", e => {this.selPartenza(-1);}); })
      
        }else{
          buttonPop = '<button class="partenza">Seleziona Partenza</button><br><button class="arrivo">Seleziona Arrivo</button><br><button class="intermedio">Aggiungi Punto Intermedio</button>';
          this.newMarker.bindPopup(buttonPop)
          .on("popupopen",  (a) => {
            var popUp = a.target.getPopup()
            popUp.getElement()
            .querySelector(".partenza  ")
            .addEventListener("click", e => {this.selPartenza(-1);}); })
          .on("popupopen",  (a) => {
            var popUp = a.target.getPopup()
            popUp.getElement()
            .querySelector(".intermedio  ")
            .addEventListener("click", e => {this.addPuntoIntermedio(-1);}); })
          .on("popupopen",  (b) => {
            var popUp = b.target.getPopup()
            popUp.getElement()
            .querySelector(".arrivo  ")
            .addEventListener("click", e => {this.selArrivo(-1);}); });
        }
      }
      this.newMarker.addTo(this.map);
      this.assigned = true;
    });

  }

  createAreeNaturaliMarkers(){
    this.areeNaturaliMarkers = [];
    for (let index = 0; index < this.areeNaturali.length; index++) {
      let name = this.areeNaturali[index].name;
      let popup =' <div class="card"> ' 
      +  '<div class="card-body">'
        +  '<h5 class="card-subtitle">'+ name +'</h5> <br>'
        + '<a class="card-link" href="http://localhost:4200/redirect/' + name + '">View More</a><br>'
      + '<button class="partenza">Seleziona Partenza</button><br><button class="arrivo">Seleziona Arrivo</button><br><button class="intermedio">Aggiungi Punto Intermedio</button>'
      +'</div> '
    + '</div> ' 
      let markerTmp = L.marker([this.areeNaturali[index].latitude, this.areeNaturali[index].longitude], {icon: this._mapElementsService.getAreeIcon()}).bindPopup(popup)
      .on("popupopen",  (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
        .querySelector(".partenza  ")
        .addEventListener("click", e => {this.selPartenza(index);}); })
      .on("popupopen",  (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
        .querySelector(".intermedio  ")
        .addEventListener("click", e => {this.addPuntoIntermedio(index);}); })
      .on("popupopen",  (b) => {
        var popUp = b.target.getPopup()
        popUp.getElement()
        .querySelector(".arrivo  ")
        .addEventListener("click", e => {this.selArrivo(index);}); });
      this.areeNaturaliMarkers.push(markerTmp);
    }
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
    }
  }
  
  selPartenza(indx){
    if(indx<0){
    console.log("partenza");
    if(this.isPartenzaSet){
      this.map.removeLayer(this.partenza);
    }
    this.isPartenzaSet = true;
    this.partenza =new L.Marker(this.newMarker.getLatLng(),{icon: this.startIcon});
    this.partenza.addTo(this.map);
    this.partenzaPlaceholder = ("Finish at: "+ this.partenza.getLatLng());
  } else{
    console.log("partenza");
    if(this.isPartenzaSet){
      this.map.removeLayer(this.partenza);
    }
    this.isPartenzaSet = true;
    let pop = this.areeNaturaliMarkers[indx].getPopup()
    this.partenza =new L.Marker(this.areeNaturaliMarkers[indx].getLatLng(),{icon: this.startIcon}).bindPopup(pop);
    this.partenza.addTo(this.map);
    this.partenzaPlaceholder = (this.areeNaturali[indx].name);
  }
  }

  selArrivo(indx){
    if(indx<0){
    if(this.isArrivoSet){
      this.map.removeLayer(this.arrivo);
    }
    console.log("arrivo");
    this.isArrivoSet = true;
    this.arrivo =new L.Marker(this.newMarker.getLatLng(),{icon: this.endIcon});
    this.arrivo.addTo(this.map);
    this.arrivoPlaceholder = ("Start at: "+ this.arrivo.getLatLng());
  }else{
    console.log("arrivo");
    if(this.isArrivoSet){
      this.map.removeLayer(this.arrivo);
    }
    this.isArrivoSet = true;
    let pop = this.areeNaturaliMarkers[indx].getPopup()
    this.arrivo =new L.Marker(this.areeNaturaliMarkers[indx].getLatLng(),{icon: this.endIcon}).bindPopup(pop);
    this.arrivo.addTo(this.map);
    this.arrivoPlaceholder = (this.areeNaturali[indx].name);
  }
  }

  addPuntoIntermedio(indx){
    if(indx<0){
    for (let index = 0; index < this.itinerario.length; index++) {
      this.map.removeLayer(this.itinerario[index]);
    }
    this.itinerario = [];
    console.log("punto intermedio")
    let intermedio = new  L.Marker(this.newMarker.getLatLng(),{icon: this.intIcon});
    this.puntiIntermediIds.push(this.count);
    this.puntiIntermedi.push(intermedio);
    this.placeholders.push("punto intermedio at: "+intermedio.getLatLng());
    this.puntiIntermedi[this.count%1000].addTo(this.map);
    this.numberPuntiIntermediSet = this.numberPuntiIntermediSet + 1;
    this.count = this.count +1;
  }else{
    for (let index = 0; index < this.itinerario.length; index++) {
      this.map.removeLayer(this.itinerario[index]);
    }
    this.itinerario = [];
    console.log("punto intermedio")
    let pop = this.areeNaturaliMarkers[indx].getPopup()
    let intermedio = new L.Marker(this.areeNaturaliMarkers[indx].getLatLng(),{icon: this.intIcon}).bindPopup(pop);
    this.puntiIntermediIds.push(this.count);
    this.puntiIntermedi.push(intermedio);
    this.placeholders.push(this.areeNaturali[indx].name);
    this.puntiIntermedi[this.count%1000].addTo(this.map);
    this.numberPuntiIntermediSet = this.numberPuntiIntermediSet + 1;
    this.count = this.count +1;
  }
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
    for (let index = 0; index < this.itinerario.length; index++) {
      this.map.removeLayer(this.itinerario[index]);
    }
    this.itinerario = [];
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
  this.baseJson = {"type": "FeatureCollection", "features": []};
  this.features = [];
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
        .subscribe((data:any) => {
          let itiner = data;
          let itinerJ= JSON.stringify(itiner);  
          this.features.push(data.features[0]);       
          console.log(data.features[0]);
          this.itinerario.push(L.geoJSON(JSON.parse(itinerJ)));
          this.itinerario[this.itinerario.length-1].addTo(this.map);
        });
      this.isItinerarioPresente = true;
      this.baseJson.features = this.features;
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
      .subscribe((data:any) => {
        let itiner = data;
        let itinerJ= JSON.stringify(itiner);
        this.features.push(data.features[0]);  
        console.log(itinerJ);
        this.itinerario.push(L.geoJSON(JSON.parse(itinerJ)));
        this.itinerario[this.itinerario.length-1].addTo(this.map);
      });
    this.isItinerarioPresente = true;
    this.baseJson.features = this.features;
    }  
  }    
  }
  sanitize(){
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.baseJson).toString());
    let link = "data:'" + data;
    return this.sanitizer.bypassSecurityTrustUrl(link);
  }
  sanitize2(){
    let gpx = togpx(this.baseJson);
    let data2 = "xml/gpx;charset=utf-8," + encodeURIComponent(gpx);
    let link2 = "data:'" + data2;
    return this.sanitizer.bypassSecurityTrustUrl(link2);
  }
}
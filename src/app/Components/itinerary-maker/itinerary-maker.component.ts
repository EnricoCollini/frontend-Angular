import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as L from 'leaflet';
import { stringify } from 'querystring';
import { ItineraryMakerService } from '../../Services/itineraryMakerService/itinerary-maker.service';

@Component({
  selector: 'app-itinerary-maker',
  templateUrl: './itinerary-maker.component.html',
  styleUrls: ['./itinerary-maker.component.css']
})
export class ItineraryMakerComponent implements OnInit {
  @Input() markers: L.Marker;
  @Input() marks: L.Marker[];
  public partenza: L.Marker;
  public itinerariopresente = false;
  public partenzaTitle= "Select a point on the map";
  public assignedpartenza = false;
  public itinerJdownload = [];
  public assignedarrivo = false;
  public arrivo :L.Marker;
  public arrivoTitle="Select a point on the map";
  public puntiIntermedi : L.Marker[];
  public puntiIntermediLats =[];
  public punti: String[];

  public newMarker: L.Marker;
  public assigned = false;

  public itinerario = [];

  public  greenIcon :L.Icon;
  public  intIcon : L.Icon;
  public  startIcon : L.Icon;
  public  endIcon : L.Icon;

  public itinerarioJ;
  public itiner;
  public itinerJ;
  public center = L.latLng(43.5,11.5);
  public map: L.Map;
  public zoom = 15;
  public numero = 0;
  public tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  constructor(private _itinerarymakerservice: ItineraryMakerService,
    private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.greenIcon = this._itinerarymakerservice.getMapsIcon();
    this.intIcon = this._itinerarymakerservice.getIntIcon();
    this.startIcon = this._itinerarymakerservice.getStartIcon();
    this.endIcon = this._itinerarymakerservice.getFinishIcon();

    this.punti = [];
    this.puntiIntermedi = [];
    this.map = L.map('map').setView(this.center, this.zoom);
    this.tile.addTo(this.map);
    
    this.map.on("click", <LeafletMouseEvent>(e) => {
      if(this.assigned == true){
        this.map.removeLayer(this.newMarker);
      }
      let tmp = L.marker(e.latlng ,  {icon: this.greenIcon} );
      this.newMarker= tmp;
      this.newMarker.bindPopup('<button class="partenza">Seleziona Partenza</button><br><button class="arrivo">Seleziona Arrivo</button><br><button class="intermedio">Aggiungi Punto Intermedio</button>')
      .on("popupopen",  (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
       .querySelector(".partenza  ")
       .addEventListener("click", e => {
         this.selPartenza();
       });
       })
       .on("popupopen",  (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
       .querySelector(".intermedio  ")
       .addEventListener("click", e => {
         this.addPuntoIntermedio();
       });
       })
       .on("popupopen",  (b) => {
        var popUp = b.target.getPopup()
        popUp.getElement()
       .querySelector(".arrivo  ")
       .addEventListener("click", e => {
         this.selArrivo();
       });
       })        
      this.newMarker.addTo(this.map);
      this.assigned = true;

    });


  }

  selPartenza(){
    if(this.assignedpartenza == true){
      this.map.removeLayer(this.partenza);
    }
    console.log(this.newMarker.getLatLng().lat);
    let check = -1;
    if(typeof(this.puntiIntermediLats)!=undefined){
      for (let index = 0; index < this.puntiIntermediLats.length; index++) {
        if(this.puntiIntermediLats[index]==this.newMarker.getLatLng().lat){
          check = index;
        }
      }
    }
    if(check==-1){
      this.partenza =new L.Marker(this.newMarker.getLatLng(),{icon: this.startIcon});
      this.partenza.addTo(this.map);
      this.assignedpartenza = true;
      this.partenzaTitle = "Selected: " + this.newMarker.getLatLng().lat + "," +this.newMarker.getLatLng().lng; 
    }
    else{
      this.map.removeLayer(this.puntiIntermedi[check]);
      this.partenza =new L.Marker(this.newMarker.getLatLng(),{icon: this.startIcon});
      this.partenza.addTo(this.map);
      this.assignedpartenza = true;
      this.partenzaTitle = "Selected: " + this.newMarker.getLatLng().lat + "," +this.newMarker.getLatLng().lng; 
      this.punti.splice(check,1);
      this.puntiIntermediLats.splice(check,1);
      this.itinerJdownload.splice(check,1);
      this.puntiIntermedi.splice(check,1);
    }
    }

  selArrivo(){
    if(this.assignedarrivo == true){
      this.map.removeLayer(this.arrivo);
    }
    console.log(this.newMarker.getLatLng().lat);
    let check = -1;
    if(typeof(this.puntiIntermediLats)!=undefined){
      for (let index = 0; index < this.puntiIntermediLats.length; index++) {
        if(this.puntiIntermediLats[index]==this.newMarker.getLatLng().lat){
          check = index;
        }
      }
    }
    if(check==-1){
      this.arrivo =new L.Marker(this.newMarker.getLatLng(),{icon: this.endIcon});
      this.arrivo.addTo(this.map);
      this.assignedarrivo = true;
      this.arrivoTitle = "Selected: " + this.newMarker.getLatLng().lat + "," +this.newMarker.getLatLng().lng; 
    }
    else{
      this.map.removeLayer(this.puntiIntermedi[check]);
      this.arrivo =new L.Marker(this.newMarker.getLatLng(),{icon: this.endIcon});
      this.arrivo.addTo(this.map);
      this.assignedarrivo = true;
      this.arrivoTitle = "Selected: " + this.newMarker.getLatLng().lat + "," +this.newMarker.getLatLng().lng; 
      this.punti.splice(check,1);
      this.itinerJdownload.splice(check,1);
      this.puntiIntermediLats.splice(check,1);
      this.puntiIntermedi.splice(check,1);
    }
  }

  addPuntoIntermedio(){
    if(this.assignedpartenza == false){
      alert("Selezionare prima Partenza");
    }else{
      if(this.assignedarrivo == false){
        alert("Selezionare prima Arrivo");
      }else{
        let check = -1;
        if(typeof(this.puntiIntermediLats)!=undefined){
          for (let index = 0; index < this.puntiIntermediLats.length; index++) {
            if(this.puntiIntermediLats[index]==this.newMarker.getLatLng().lat){
              check = index;
            }
          }
        }
        if(check==-1){
          let tmp = "Punto Intermedio: " + this.newMarker.getLatLng().lat + "," + this.newMarker.getLatLng().lng;
          let tmpLat = this.newMarker.getLatLng().lat;
          let tmpMarker = new L.Marker(this.newMarker.getLatLng(),{icon: this.intIcon})
          this.puntiIntermedi.push(tmpMarker);
          this.punti.push(tmp);
          this.puntiIntermediLats.push(tmpLat);
          this.puntiIntermedi[this.puntiIntermedi.length - 1].addTo(this.map); 
        
        }
        else{
          this.map.removeLayer(this.puntiIntermedi[check]);
          this.punti.splice(check,1);
          this.itinerJdownload.splice(check,1);
          this.puntiIntermediLats.splice(check,1);
          this.puntiIntermedi.splice(check,1);
          let tmp = "Punto Intermedio: " + this.newMarker.getLatLng().lat + "," + this.newMarker.getLatLng().lng;
          let tmpLat = this.newMarker.getLatLng().lat;
          let tmpMarker = new L.Marker(this.newMarker.getLatLng(),{icon: this.intIcon})
          this.puntiIntermedi.push(tmpMarker);
          this.punti.push(tmp);
          this.puntiIntermediLats.push(tmpLat);
          this.puntiIntermedi[this.puntiIntermedi.length - 1].addTo(this.map); 
        }
        console.log("ok"); 
      }
    }

  }


  

  getRoute(){
    if(!this.itinerariopresente){
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
            this.itiner = data;
            this.itinerJ= JSON.stringify(this.itiner);
            this.itinerJdownload.push(this.itinerJ);
            this.itinerario.push(L.geoJSON(JSON.parse(this.itinerJ)));
            this.itinerario[this.itinerario.length-1].addTo(this.map);
            this.itinerariopresente = true;
          });
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
          this.itiner = data;
          this.itinerJ= JSON.stringify(this.itiner);
          this.itinerJdownload.push(this.itinerJ);
          this.itinerario.push(L.geoJSON(JSON.parse(this.itinerJ)));
          this.itinerario[this.itinerario.length-1].addTo(this.map);
          this.itinerariopresente = true;
        });
      }  
    }    
  }

  elimina(check: number){
    this.map.removeLayer(this.puntiIntermedi[check]);
    this.punti.splice(check,1);
    this.itinerJdownload.splice(check,1);
    this.puntiIntermediLats.splice(check,1);
    this.puntiIntermedi.splice(check,1);
  }

  
  sanitize(){
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.itinerJdownload));
    let link = "data:'" + data;
    return this.sanitizer.bypassSecurityTrustUrl(link);
  }

  loadMarks(){
    for (let index = 0; index < this.marks.length; index++) {
      this.marks[index].addTo(this.map);
      console.log("loaded"); 
     }
  }

}

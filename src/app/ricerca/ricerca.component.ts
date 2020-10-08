import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { AreaNaturaleService } from '../area-naturale.service';
import { RistoriService } from '../ristori.service';
import { StruttureRicettiveService } from '../strutture-ricettive.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})

export class RicercaComponent implements OnInit {

  dropDownOpen = false;

  public areeNaturali = [];
  public struttureRicettive = [];
  public ristori = [];
  public ristoriMarkers = [];
  public areeNaturaliMarkers = [];
  public struttureMarkers = [];

  public map: L.Map;
  public zoom: number;
  public  greenIcon = L.icon({
    iconUrl:  "https://pngimage.net/wp-content/uploads/2018/06/flat-tree-png-2.png",
    
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


  constructor(private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService,
    private _ristoriService: RistoriService) {}

  ngOnInit() {

    this.mapInit();

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

    
    //L.marker([43, 11], {icon: this.greenIcon}).bindPopup('<b>Hello!!</b>').addTo(this.map);
  }

  mapInit(){
    this.map = L.map('map').setView([43, 12], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  createAreeNaturaliMarkers(){
    this.areeNaturaliMarkers = [];
    for (let index = 0; index < this.areeNaturali.length; index++) {
      let popup = this.createPopup(this.areeNaturali[index].name, this.areeNaturali[index]); 
      let markerTmp = L.marker([this.areeNaturali[index].latitude, this.areeNaturali[index].longitude], {icon: this.greenIcon}).bindPopup(popup);
      this.areeNaturaliMarkers.push(markerTmp);
    }
    console.log(this.areeNaturaliMarkers.length);
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }
  }

  createRistoriMarkers(){
    this.ristoriMarkers = [];
    for (let index = 0; index < this.ristori.length; index++) {
      let popup = this.createPopup(this.ristori[index].name, this.ristori[index]); 
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
      let popup = this.createPopup(this.struttureRicettive[index].name, this.struttureRicettive[index]); 
      let markerTmp = L.marker([this.struttureRicettive[index].latitude, this.struttureRicettive[index].longitude], {icon: this.struttIcon}).bindPopup(popup);
      this.struttureMarkers.push(markerTmp);
    }
    console.log(this.struttureMarkers.length);
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.struttureMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }
  }

  createPopup(nome, areaNaturale){
    //split('hello').join('hi')
    let stringa = JSON.stringify(areaNaturale).split("{").join("");
    let strin = stringa.split('"').join('');
    let stri = strin.split(' ').join('%20');
    let str = stri.split(",").join("&");
    console.log(str);
    //let link = '[routerLink]="["/detail/",' + areaNaturale.latitude + ']"  [queryParams]="'+ areaNaturale+ '"';
    let popup =' <div class="card"> ' 
              +  '<div class="card-body">'
                +  '<h5 class="card-subtitle">'+ nome +'</h5> <br>'
                + '<a class="card-link" href="http://localhost:4200/redirect/' +areaNaturale.name + '">View More</a>'
              + '</div> '
            + '</div> '
    return(popup);
  }

  toggleDropdown(){
    this.dropDownOpen = true;
  }

  showOnlyAreeNaturali(){
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.map.removeLayer(this.struttureMarkers[index]);
    }
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }
  }

  showOnlyStrutture(){
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.map.removeLayer(this.areeNaturaliMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.map.removeLayer(this.ristoriMarkers[index]);
      
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.struttureMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }
  }

  showOnlyRistori(){
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.map.removeLayer(this.areeNaturaliMarkers[index]);
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.map.removeLayer(this.struttureMarkers[index]);
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.ristoriMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
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
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.areeNaturaliMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.struttureMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.ristoriMarkers[index].addTo(this.map);
      console.log("markerAggiunto")
    }

  }

}



 


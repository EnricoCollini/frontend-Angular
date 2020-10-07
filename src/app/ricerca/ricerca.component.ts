import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { AreaNaturaleService } from '../area-naturale.service';
import { StruttureRicettiveService } from '../strutture-ricettive.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})

export class RicercaComponent implements OnInit {

  public areeNaturali = [];
  public struttureRicettive = [];
  public markers = [];

  public map: L.Map;
  public zoom: number;
  public  greenIcon = L.icon({
    iconUrl:  "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg",
    
    iconSize:     [38, 38], // size of the icon
    
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
   
    popupAnchor:  [-3, -38] // point from which the popup should open relative to the iconAnchor
  });


  constructor(private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService) {}

  ngOnInit() {

    this.mapInit();

    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe(data => {
        this.areeNaturali = data;
        this.createStruttureRicettiveMarkers();
      });

    this._struttureRicettiveService.getStruttureRicettiveFromDB()
      .subscribe(data=> this.struttureRicettive = data);

    
    //L.marker([43, 11], {icon: this.greenIcon}).bindPopup('<b>Hello!!</b>').addTo(this.map);
  }

  mapInit(){
    this.map = L.map('map').setView([43, 12], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  createStruttureRicettiveMarkers(){
    this.markers = [];
    for (let index = 0; index < this.areeNaturali.length; index++) {
      let popup = this.createPopup(this.areeNaturali[index].name, this.areeNaturali[index]); 
      let markerTmp = L.marker([this.areeNaturali[index].latitude, this.areeNaturali[index].longitude], {icon: this.greenIcon}).bindPopup(popup);
      this.markers.push(markerTmp);
    }
    console.log(this.markers.length);
    for (let index = 0; index < this.markers.length; index++) {
      this.markers[index].addTo(this.map);
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

}



 


import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaNaturaleService } from '../area-naturale.service';
import { ItinerarioService } from '../itinerario.service';
import { RistoriService } from '../ristori.service';
import { StruttureRicettiveService } from '../strutture-ricettive.service';
import * as L from 'leaflet';
import { ItineraryMakerComponent } from '../itinerary-maker/itinerary-maker.component';

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css']
})
export class MakerComponent implements OnInit {

  @ViewChild(ItineraryMakerComponent) childcomp: ItineraryMakerComponent;

  public areeNaturali = [];
  public struttureRicettive = [];
  public ristori = [];
  public itinerari = [];

  public ristoriMarkers = [];
  public areeNaturaliMarkers = [];
  public struttureMarkers = [];
  public itinerariMarkers = [];

  public tuttiImarkers = [];
  public  greenIcon = L.icon({
    iconUrl:  "https://pngimage.net/wp-content/uploads/2018/06/flat-tree-png-2.png",
    
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


  constructor(private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService,
    private _ristoriService: RistoriService,
    private _itinerariService: ItinerarioService) {}

  ngOnInit() {
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

  createAreeNaturaliMarkers(){
    this.areeNaturaliMarkers = [];
    for (let index = 0; index < this.areeNaturali.length; index++) {
      let popup = this.createPopup(this.areeNaturali[index].name, this.areeNaturali[index]); 
      let markerTmp = L.marker([this.areeNaturali[index].latitude, this.areeNaturali[index].longitude], {icon: this.greenIcon}).bindPopup(popup);
      this.areeNaturaliMarkers.push(markerTmp);
    }
  }

  createItinerariMarkers(){
    this.itinerariMarkers = [];
    for (let index = 0; index < this.itinerari.length; index++) {
      let popup = this.createPopup(this.itinerari[index].name, this.itinerari[index]); 
      let markerTmp = L.marker([this.itinerari[index].startlatitude, this.itinerari[index].endlongitude], {icon: this.itiIcon}).bindPopup(popup);
      this.itinerariMarkers.push(markerTmp);

    }
  }

  createRistoriMarkers(){
    this.ristoriMarkers = [];
    for (let index = 0; index < this.ristori.length; index++) {
      let popup = this.createPopup(this.ristori[index].name, this.ristori[index]); 
      let markerTmp = L.marker([this.ristori[index].latitude, this.ristori[index].longitude], {icon: this.ristoIcon}).bindPopup(popup);
      this.ristoriMarkers.push(markerTmp);
    }

  }



  createStruttureRicettiveMarkers(){
    this.struttureMarkers = [];
    for (let index = 0; index < this.struttureRicettive.length; index++) {
      let popup = this.createPopup(this.struttureRicettive[index].name, this.struttureRicettive[index]); 
      let markerTmp = L.marker([this.struttureRicettive[index].latitude, this.struttureRicettive[index].longitude], {icon: this.struttIcon}).bindPopup(popup);
      this.struttureMarkers.push(markerTmp);
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

  loadMarkers(){
    for (let index = 0; index < this.areeNaturaliMarkers.length; index++) {
      this.tuttiImarkers.push(this.areeNaturaliMarkers[index]);
      
    }
    for (let index = 0; index < this.ristoriMarkers.length; index++) {
      this.tuttiImarkers.push(this.ristoriMarkers[index]);
      
    }
    for (let index = 0; index < this.struttureMarkers.length; index++) {
      this.tuttiImarkers.push(this.struttureMarkers[index]);
      
    }
    for (let index = 0; index < this.itinerariMarkers.length; index++) {
      this.tuttiImarkers.push(this.itinerariMarkers[index]);
 
    }
    console.log("tutti i amrkers: " + this.tuttiImarkers.length);
    this.callChild();
  }


  callChild() {
    this.childcomp.loadMarks();
  }

  

}

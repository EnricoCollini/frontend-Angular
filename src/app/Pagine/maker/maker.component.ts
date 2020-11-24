import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AreaNaturaleService } from '../../Services/areaNaturaleService/area-naturale.service';
import { ItinerarioService } from '../../Services/itineraryService/itinerario.service';
import { RistoriService } from '../../Services/ristoroService/ristori.service';
import { StruttureRicettiveService } from '../../Services/struttureRicettiveService/strutture-ricettive.service';
import * as L from 'leaflet';
import { ItineraryMakerComponent } from '../../Components/itinerary-maker/itinerary-maker.component';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css']
})
export class MakerComponent implements OnInit{

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

  public  greenIcon : L.Icon;
  public  itiIcon : L.Icon;
  public  struttIcon: L.Icon;
  public  ristoIcon: L.Icon;


  constructor(
    @Inject(DOCUMENT) document,
    private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService,
    private _ristoriService: RistoriService,
    private _itinerariService: ItinerarioService,
    private _mapElementsService: MapElementsService) {}

  ngOnInit() {
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
    setTimeout(this.chiama, 2000);
  }

  chiama(){
    //document.getElementById('button').click();
  }


  createAreeNaturaliMarkers(){
    this.areeNaturaliMarkers = [];
    for (let index = 0; index < this.areeNaturali.length; index++) {
      let popup = this._mapElementsService.getPopup(this.areeNaturali[index].name); 
      let markerTmp = L.marker([this.areeNaturali[index].latitude, this.areeNaturali[index].longitude], {icon: this.greenIcon}).bindPopup(popup);
      this.areeNaturaliMarkers.push(markerTmp);
    }
  }

  createItinerariMarkers(){
    this.itinerariMarkers = [];
    for (let index = 0; index < this.itinerari.length; index++) {
      let popup =this._mapElementsService.getPopup(this.itinerari[index].name); 
      let markerTmp = L.marker([this.itinerari[index].startlatitude, this.itinerari[index].endlongitude], {icon: this.itiIcon}).bindPopup(popup);
      this.itinerariMarkers.push(markerTmp);

    }
  }

  createRistoriMarkers(){
    this.ristoriMarkers = [];
    for (let index = 0; index < this.ristori.length; index++) {
      let popup = this._mapElementsService.getPopup(this.ristori[index].name); 
      let markerTmp = L.marker([this.ristori[index].latitude, this.ristori[index].longitude], {icon: this.ristoIcon}).bindPopup(popup);
      this.ristoriMarkers.push(markerTmp);
    }

  }

  createStruttureRicettiveMarkers(){
    this.struttureMarkers = [];
    for (let index = 0; index < this.struttureRicettive.length; index++) {
      let popup = this._mapElementsService.getPopup(this.struttureRicettive[index].name); 
      let markerTmp = L.marker([this.struttureRicettive[index].latitude, this.struttureRicettive[index].longitude], {icon: this.struttIcon}).bindPopup(popup);
      this.struttureMarkers.push(markerTmp);
    }
    
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
    //this.childcomp.loadMarks();
  }

  

}
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { pureFunction0 } from '@angular/core/src/render3/pure_function';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { StrutturaRicettivaAddPageComponent } from 'src/app/Pagine/AddPages/struttura-ricettiva-add-page/struttura-ricettiva-add-page.component';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';
import { IItinerario } from 'src/app/Services/itineraryService/itinerario';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';
import { IPunto } from 'src/app/Services/puntoService/punto';
import { PuntoService } from 'src/app/Services/puntoService/punto.service';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';
import { IRistoro } from 'src/app/Services/ristoroService/ristoro';
import { IStrutturaRicettiva } from 'src/app/Services/struttureRicettiveService/strutturaricettiva';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';
import { IAreaNaturale } from '../../Services/areaNaturaleService/areanturale';

@Component({
  selector: 'app-area-naturale-scheda',
  templateUrl: './area-naturale-scheda.component.html',
  styleUrls: ['./area-naturale-scheda.component.css']
})
export class AreaNaturaleSchedaComponent implements OnInit {
  public map: L.Map;
  public zoom: number;
  public  areaIcon : L.Icon;
  public  itiIcon : L.Icon;
  public  struttIcon : L.Icon;
  public  ristoIcon : L.Icon;
  public puntoIcon : L.Icon;
  private greenIcon: L.Icon;
  private popup: string;
  private center : L.LatLng
  private thisIcon: L.Icon;
  
  private id: number;
  private name: string;
  private description: string;
  private city: string;
  private province: string;
  private latitude: string;
  private longitude: string;

  private ristoriIds: number[];
  private ristori: IRistoro[] = [];
  private ristoCalled = false;

  private StruttureIds: number[];
  private Strutture: IStrutturaRicettiva[] = [];
  private struttureCalled = false;

  private ItinerariIds: number[];
  private Itinerari: IItinerario[] = [];
  private itinerariCalled = false;

  private PuntiIds: number[];
  private Punti: IPunto[] = [];
  private puntiCalled = false;

  constructor(private route: ActivatedRoute,
    private _areaNaturaleService: AreaNaturaleService,
    private _ristoroService: RistoriService,
    private _strutturaService: StruttureRicettiveService,
    private _itinerariService: ItinerarioService,
    private _puntiService: PuntoService,
    private _mapElementsService: MapElementsService) { }


  ngOnInit() {
    this.map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.greenIcon = this._mapElementsService.getMapsIcon();
    this.greenIcon = this._mapElementsService.getAreeIcon();
    this.itiIcon = this._mapElementsService.getItinIcon();
    this.ristoIcon = this._mapElementsService.getRistoIcon();
    this.struttIcon = this._mapElementsService.getStruttIcon();
    this.puntoIcon = this._mapElementsService.getPuntoIcon();
    
    this.route.queryParams
      .subscribe(params =>{
        console.log(params.name);
        this.id = params.id;
        console.log(params.id);
        this.name = params.name;
        this.description = params.description;
        this.city = params.city;
        this.province = params.province;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        console.log(this.latitude)
        this.center = new L.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));
        this.map.setView([parseFloat(this.latitude), parseFloat(this.longitude)], 16);
      });
    
    this.popup = this._mapElementsService.getPopupNav(this.name, this.center);

    L.marker(this.center, {icon: this.greenIcon})
    .bindPopup(this.popup)
    .addTo(this.map);
      

    this._areaNaturaleService.getRistoAssociati(this.id)
    .subscribe(data => {
      this.ristoriIds = data;
    })

    this._areaNaturaleService.getStruttureAssociati(this.id)
    .subscribe(data => {
      this.StruttureIds = data;
    })

    this._areaNaturaleService.getItiAssociati(this.id)
    .subscribe(data => {
      this.ItinerariIds = data;
    })

    this._areaNaturaleService.getPuntiAssociati(this.id)
  .subscribe(data => {
    this.PuntiIds = data;
  })  }

  async showStuff(ristoT, struttT, itiT, puntiT){
    if(ristoT){
      this.showRisto();
    }
    if(struttT){
      this.showStrutture();
    }
    if(itiT){
      this.showItinerari();
    }
    if(puntiT){
      this.showPunti();
    }
    const result = await this.resolveAfter2Seconds();
    if(ristoT){
      this.addMarkers(this.ristori, true, false, false,false);
    }
    if(struttT){
      this.addMarkers(this.Strutture, false, true, false,false);
    }
    if(itiT){
      this.addMarkers(this.Itinerari, false, false, true,false);
    }
    if(puntiT){
      this.addMarkers(this.Punti, false, false, false,true);
    }
  }

  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  showRisto(){
    if(!this.ristoCalled){
    if(this.ristoriIds.length>=1){
      for (let index = 0; index < this.ristoriIds.length; index++) {
        const element = this.ristoriIds[index];
        this._ristoroService.getRistoroWithId(element)
        .subscribe(data => {
          this.ristori.push(data);
        })      
      }
      this.ristoCalled = true;
      console.log(this.ristori);
    }else{
      window.alert("Non ci sono Ristori Associati");
    }
    }else{
      console.log("chiamato")
    }
  }

  showStrutture(){
    if(!this.struttureCalled){
    if(this.StruttureIds.length>=1){
      for (let index = 0; index < this.StruttureIds.length; index++) {
        const element = this.StruttureIds[index];
        this._strutturaService.getStrutturaWithId(element)
        .subscribe(data => {
          this.Strutture.push(data);
        })
      }
      console.log(this.Strutture);
      this.addMarkers(this.Strutture, false, true, false, false);
      this.struttureCalled = true;
    }else{
      window.alert("Non ci sono Strutture Ricettive Associate");
    }
    }
  }

  showItinerari(){
    if(!this.itinerariCalled){
    if(this.ItinerariIds.length>=0){
      for (let index = 0; index < this.ItinerariIds.length; index++) {
        const element = this.ItinerariIds[index];
        this._itinerariService.getItinerarioWithId(element)
        .subscribe(data => {
          this.Itinerari.push(data);
        })
      }
      this.itinerariCalled = true;
      this.addMarkers(this.Itinerari, false, false, true, false);
      console.log(this.Itinerari);
    }else{
      window.alert("Non ci sono Itinerari Associati")
    }
    }
  }

  showPunti(){
    if(!this.puntiCalled){
    if(this.PuntiIds.length>=1){
      for (let index = 0; index < this.PuntiIds.length; index++) {
        const element = this.PuntiIds[index];
        this._puntiService.getPuntoWithId(element)
        .subscribe(data => {
          this.Punti.push(data);
        })
      }
      console.log(this.Punti);
      this.addMarkers(this.Punti, false, false, false, true);
      this.puntiCalled =true;
    }else{
      window.alert("Non ci sono Punti Generici Associati")
    }
    } 
  }

  addMarkers(risorseArray, risorseType, struttType, itiType, pointType){
    if(risorseType){
      this.thisIcon = this.ristoIcon;
    }
    if(struttType){
      this.thisIcon = this.struttIcon;
    }
    if(itiType){
      this.thisIcon = this.itiIcon
    }
    if(pointType){
      this.thisIcon = this.puntoIcon;
    }
    console.log(risorseArray.length);
    for (let index = 0; index < risorseArray.length; index++) {
      console.log("vediamo");
      let popup = this._mapElementsService.getPopup(risorseArray[index].name);
      let markerTmp = L.marker([risorseArray[index].latitude, risorseArray[index].longitude], {icon: this.thisIcon}).bindPopup(popup);
      markerTmp.addTo(this.map);
      console.log("marker aggiunto");
    }

  }


}

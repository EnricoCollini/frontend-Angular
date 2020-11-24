import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import * as togpx from 'togpx';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';
import { IAreaNaturale } from 'src/app/Services/areaNaturaleService/areanturale';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';
import { MapElementsService } from 'src/app/Services/mapElementsService/map-elements.service';
import { IPunto } from 'src/app/Services/puntoService/punto';
import { PuntoService } from 'src/app/Services/puntoService/punto.service';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';
import { IRistoro } from 'src/app/Services/ristoroService/ristoro';
import { IStrutturaRicettiva } from 'src/app/Services/struttureRicettiveService/strutturaricettiva';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-itinerario-scheda',
  templateUrl: './itinerario-scheda.component.html',
  styleUrls: ['./itinerario-scheda.component.css']
})
export class ItinerarioSchedaComponent implements OnInit {

  private id: number;
  private  name: string;
  private  description: string;
  private  startcity: string;
  private  startprovince: string;
  private  endcity: string;
  private  endprovince: string;
  private  track: string;
	private startlatitude: number; 
  private  startlongitude: number;
  private  endlatitude: number;
  private  endlongitude: number;
  private data : string;
  private data2: string;
  private link : string;
  private link2: string;
  private sanitizedUrl;
  private gpx;

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
  


  private ristoriIds: number[];
  private ristori: IRistoro[] = [];
  private ristoCalled = false;

  private StruttureIds: number[];
  private Strutture: IStrutturaRicettiva[] = [];
  private struttureCalled = false;

  private AreeIds: number[];
  private Aree: IAreaNaturale[] = [];
  private areeCalled = false;

  private PuntiIds: number[];
  private Punti: IPunto[] = [];
  private puntiCalled = false;
  
  
  constructor(
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer,
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
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.startcity = params.startcity;
        this.startprovince = params.startprovince;
        this.startlatitude = params.startlatitude;
        this.startlongitude = params.startlongitude;
        this.endcity = params.endcity;
        this.endprovince = params.endprovince;
        this.endlatitude = params.endlatitude;
        this.endlongitude = params.endlongitude;
        this.track = params.track;
        console.log(this.track);
        this.gpx = togpx(JSON.parse(this.track));
        console.log(this.gpx);

        this.data = "text/json;charset=utf-8," + encodeURIComponent(this.track);
        this.link = "data:'" + this.data;

        this.data2 = "xml/gpx;charset=utf-8," + encodeURIComponent(this.gpx);
        this.link2 = "data:'" + this.data2;
        
        this.center = new L.LatLng(this.endlatitude, this.endlongitude);
        this.map.setView([this.endlatitude,this.endlongitude], 16);
      })

      this.popup = this._mapElementsService.getPopupNav(this.name, this.center);

      L.marker(this.center, {icon: this._mapElementsService.getMapsIcon()})
      .bindPopup(this.popup)
      .addTo(this.map);

      L.geoJSON(JSON.parse(this.track)).addTo(this.map);
      
    this._itinerariService.getRistoAssociati(this.id)
    .subscribe(data => {
      this.ristoriIds = data;
    })

    this._itinerariService.getStruttureAssociati(this.id)
    .subscribe(data => {
      this.StruttureIds = data;
    })

    this._itinerariService.getAreeAssociati(this.id)
    .subscribe(data => {
      this.AreeIds = data;
    })

    this._itinerariService.getPuntiAssociati(this.id)
  .subscribe(data => {
    this.PuntiIds = data;
  })
  }

  async showStuff(ristoT, struttT, areeT, puntiT){
    if(ristoT){
      this.showRisto();
    }
    if(struttT){
      this.showStrutture();
    }
    if(areeT){
      this.showAree();
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
    if(areeT){
      this.addMarkers(this.Aree, false, false, true,false);
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
      this.struttureCalled = true;
    }else{
      window.alert("Non ci sono Strutture Ricettive Associate");
    }
    }
  }

  showAree(){
    if(!this.areeCalled){
    if(this.AreeIds.length>=0){
      for (let index = 0; index < this.AreeIds.length; index++) {
        const element = this.AreeIds[index];
        this._areaNaturaleService.getAreaNaturaleWithId(element)
        .subscribe(data => {
          this.Aree.push(data);
        })
      }
      this.areeCalled = true;
      this.addMarkers(this.Aree, false, false, true, false);
      console.log(this.Aree);
    }else{
      window.alert("Non ci sono Aree Associate")
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

  addMarkers(risorseArray, risorseType, struttType, areeType, pointType){
    if(risorseType){
      this.thisIcon = this.ristoIcon;
    }
    if(struttType){
      this.thisIcon = this.struttIcon;
    }
    if(areeType){
      this.thisIcon = this.areaIcon;
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

  sanitize(){
    return this.sanitizer.bypassSecurityTrustUrl(this.link);
}
sanitize2(){
  return this.sanitizer.bypassSecurityTrustUrl(this.link2);
}

}


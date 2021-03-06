import { PuntoService } from 'src/app/Services/puntoService/punto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaNaturaleService } from '../Services/areaNaturaleService/area-naturale.service';
import { ItinerarioService } from '../Services/itineraryService/itinerario.service';
import { RistoriService } from '../Services/ristoroService/ristori.service';
import { StruttureRicettiveService } from '../Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  public areeNaturali = [];
  public struttureRicettive = [];
  public ristori = [];
  public itinerari = [];
  public name = "";
  public punti = [];

  constructor(
    private route: ActivatedRoute,
    private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService,
    private _ristoriService : RistoriService,
    private _itinerariService: ItinerarioService,
    private _puntoService : PuntoService,
    private router: Router) { }
    

  ngOnInit() {


    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe(data => {
        this.initializion();
        this.areeNaturali = data;
        console.log(this.areeNaturali.length);
        for (let index = 0; index < this.areeNaturali.length; index++) {
          if(this.areeNaturali[index].name == this.name){
            console.log(this.name);
            this.router.navigate(['/detail/', this.areeNaturali[index].latitude] ,{ queryParams: this.areeNaturali[index]});
          }        
        }
      }
    );

    this._puntoService.getPuntiFromDB()
    .subscribe(data => {
      this.initializion();
      this.punti = data;
      console.log(this.punti.length);
      for (let index = 0; index < this.punti.length; index++) {
        if(this.punti[index].name == this.name){
          console.log(this.name);
          this.router.navigate(['/detailPunto/', this.punti[index].latitude] ,{ queryParams: this.punti[index]});
        }        
      }
    }
    );

    this._itinerariService.getItinerariFromDB()
      .subscribe(data => {
        this.initializion();
        this.itinerari = data;
        console.log(this.itinerari.length);
        for (let index = 0; index < this.itinerari.length; index++) {
          if(this.itinerari[index].name == this.name){
            console.log(this.name);
            this.router.navigate(['/detailIti/', this.itinerari[index].startlatitude] ,{ queryParams: this.itinerari[index]});
          }        
        }
      }
    );

    this._ristoriService.getRistoriFromDB()
      .subscribe(data=>{
        this.initializion();
        this.ristori = data;
        for (let index = 0; index < this.ristori.length; index++) {
          if(this.ristori[index].name == this.name){
            this.router.navigate(['/detailRisto/', this.ristori[index].latitude], {queryParams: this.ristori[index]});
          }
        }
      }
    );

    this._struttureRicettiveService.getStruttureRicettiveFromDB()
      .subscribe(data=> {
        this.initializion();
        this.struttureRicettive = data
        console.log(this.struttureRicettive.length);
        for (let index = 0; index < this.struttureRicettive.length; index++) {
          if(this.struttureRicettive[index].name == this.name){
            console.log(this.name);
            this.router.navigate(['/detailStrut/', this.struttureRicettive[index].latitude] ,{ queryParams: this.struttureRicettive[index]});
          }  
        }
      }
    );
  
  }


  initializion(){
    this.route.params.subscribe(params => {
      this.name = params['nome'];
      console.log(this.name);
    });
  }

}

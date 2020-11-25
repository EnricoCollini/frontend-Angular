import { Component, Input, OnInit } from '@angular/core';
import { StrutturaRicettivaAddPageComponent } from 'src/app/Pagine/AddPages/struttura-ricettiva-add-page/struttura-ricettiva-add-page.component';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';
import { IAreaNaturale } from 'src/app/Services/areaNaturaleService/areanturale';
import { IItinerario } from 'src/app/Services/itineraryService/itinerario';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';
import { IRistoro } from 'src/app/Services/ristoroService/ristoro';
import { IStrutturaRicettiva } from 'src/app/Services/struttureRicettiveService/strutturaricettiva';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-associa-component',
  templateUrl: './associa-component.component.html',
  styleUrls: ['./associa-component.component.css']
})
export class AssociaComponentComponent implements OnInit {

  @Input()
  private jwt: string;

  //tipo 0: error
  //tipo 1: area naturale
  //tipo 2: ristoro
  //tipo 3: struttura ricettiva
  //tipo 4: itinerario  
  private name1: string;
  private id1: number;
  private tipo1: number;
  private name2: string;
  private id2: number;
  private tipo2: number;

  private aree: IAreaNaturale[] = [];
  private ristori: IRistoro[] = [];
  private strutture: IStrutturaRicettiva[] = [];
  private itinerari: IItinerario[] = [];

  constructor(
    private _areaService: AreaNaturaleService,
    private _ristoService: RistoriService,
    private _struttService: StruttureRicettiveService,
    private _itiService: ItinerarioService
  ) { }

  ngOnInit() {
    //console.log("token jwt: " + this.jwt);
    this._areaService.getAreeNaturaliFromDB()
      .subscribe((data) => {
        this.aree = data;
      });
    this._ristoService.getRistoriFromDB()
      .subscribe((data) => {
        this.ristori = data;
      });
    this._struttService.getStruttureRicettiveFromDB()
      .subscribe((data) => {
        this.strutture = data;
      });
    this._itiService.getItinerariFromDB()
      .subscribe((data) => {
        this.itinerari = data;
      });
  }


  submitForm(form) {
    let res = form.value;

    this.name1 = res.name1;
    this.tipo1 = this.getTypeOfResource(this.name1,1);
    console.log("tipo 1: " + this.tipo1 );

    this.name2 = res.name2;
    this.tipo2 = this.getTypeOfResource(this.name2,2);
    console.log("tipo 2: " + this.tipo2 );
    console.log(this.name2);

    this.selectAssociazione();
  }

  selectAssociazione(){
    if(this.tipo1 == 0 || this.tipo2 == 0){
      window.alert("Controllare i valori inseriti. I nomi inseriti potrebbero non essere corretti");
    }else{
    if(this.tipo1 == this.tipo2){
      window.alert("Le risorse inserite corrispondo allo stesso tipo di risorsa");
    }
    }
    if(this.tipo1 == 1 && this.tipo2 == 2 || this.tipo1 == 2 && this.tipo2 == 1 ){
      if(this.tipo1 == 1){
        this._ristoService.associaArea(this.id2, this.id1, this.jwt);
      }else{
        this._ristoService.associaArea(this.id1, this.id2, this.jwt);
      }
      window.alert("Le risorse sono state associate con successo!");
      //associa area - ristoro o ristoro-area
    }
    if(this.tipo1 == 1 && this.tipo2 == 3 || this.tipo1 == 3 && this.tipo2 == 1 ){
      if(this.tipo1 == 1){
        this._struttService.associaArea(this.id2, this.id1, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }else{
        this._struttService.associaArea(this.id1, this.id2, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }
      window.alert("Le risorse sono state associate con successo!");
      //associa area - struttura o struttura-area
    }
    if(this.tipo1 == 1 && this.tipo2 == 4 || this.tipo1 == 4 && this.tipo2 == 1 ){
      if(this.tipo1 == 1){
        this._itiService.associaArea(this.id2, this.id1, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }else{
        this._itiService.associaArea(this.id1, this.id2, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }
      window.alert("Le risorse sono state associate con successo!");
      //associa area - itinerario o itinerario-area
    }
    if(this.tipo1 == 2 && this.tipo2 == 3 || this.tipo1 == 3 && this.tipo2 == 2 ){
      window.alert("Non sono previste associazioni tra strutture ricettive e ristori")
      //associa ristoro - struttura o struttura-ristoro
    }
    if(this.tipo1 == 2 && this.tipo2 == 4 || this.tipo1 == 4 && this.tipo2 == 2 ){
      if(this.tipo1 == 2){
        this._ristoService.associaIti(this.id1, this.id2, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }else{
        this._itiService.associaArea(this.id2, this.id1, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }
      window.alert("Le risorse sono state associate con successo!");
      //associa ristoro - itinerario o itinerario-ristoro
    }
    if(this.tipo1 == 3 && this.tipo2 == 4 || this.tipo1 == 4 && this.tipo2 == 3 ){
      if(this.tipo1 == 3){
        this._struttService.associaIti(this.id1, this.id2, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }else{
        this._struttService.associaArea(this.id2, this.id1, this.jwt)
        .subscribe(data =>{
          console.log(data);
        });
      }
      window.alert("Le risorse sono state associate con successo!");
      //associa struttura - itinerario o itinerario-strittira
    }
  }

  getTypeOfResource(name, num){
    let tipo = 0;
    for (let index = 0; index < this.aree.length; index++) {
      const element = this.aree[index];
      if(name == element.name){
        tipo = 1;
        if(num == 1){
          this.id1 = element.id;
        }else{
          this.id2 = element.id;
        }
      }
    }
    for (let index = 0; index < this.ristori.length; index++) {
      const element = this.ristori[index];
      if(name == element.name){
        tipo = 2;
        if(num == 1){
          this.id1 = element.id;
        }else{
          this.id2 = element.id;
        }
      }
    }
    for (let index = 0; index < this.strutture.length; index++) {
      const element = this.strutture[index];
      if(name == element.name){
        tipo = 3;
        if(num == 1){
          this.id1 = element.id;
        }else{
          this.id2 = element.id;
        }
      }
    }
    for (let index = 0; index < this.itinerari.length; index++) {
      const element = this.itinerari[index];
      if(name == element.name){
        tipo = 4;
        if(num == 1){
          this.id1 = element.id;
        }else{
          this.id2 = element.id;
        }
      }
    }
    return tipo;
  }

}

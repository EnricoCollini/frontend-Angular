import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-struttura-ricettiva-edit-page',
  templateUrl: './struttura-ricettiva-edit-page.component.html',
  styleUrls: ['./struttura-ricettiva-edit-page.component.css']
})
export class StrutturaRicettivaEditPageComponent implements OnInit, AfterContentInit {

  constructor(private route: ActivatedRoute,
    private _struttService: StruttureRicettiveService,
    private _router: Router) { }

  private id: number;
  private jwt: string;
  private name: string;
  private address: string;
  private city: string;
  private province: string;
  private latitude: number;
  private longitude: number;
  private email: string;
  private phonenumber: string;
  private strutturaricettivatipology: string;
  private defaultChoice: string;
  private choices = ["AFFITTACAMERE",
    "AGRITURISMO",
    "ALBERGOHOTEL",
    "ALLOGGIOPRIVATO"]

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        this.jwt = params.jwt
        this.id = params.thisstrutt;
      });
    }

  ngAfterContentInit(){
    this._struttService.getStrutturaWithId(this.id)
      .subscribe(params =>{
        console.log(params.name);
        this.id = params.id;
        this.name = params.name;
        this.address = params.address;
        this.city = params.city;
        this.province = params.province;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        this.email = params.email;
        this.phonenumber = params.phonenumber;
        this.strutturaricettivatipology = params.strutturaricettivatipology;
        console.log(this.id)
        this.defaultChoice = this.strutturaricettivatipology;
      })
  }

  submitForm(form){
    let res = form.value;
    console.log(res);

    if(res.name == ""){
      res.name = this.name;
    }
    if(res.address == ""){
      res.address = this.address;
    }
    if(res.city == ""){
      res.city = this.city;
    }
    if(res.province == ""){
      res.province = this.province;
    }
    if(res.latitude == ""){
      res.latitude = this.latitude;
    }
    if(res.longitude == ""){
      res.longitude = this.longitude;
    }
    if(res.email == ""){
      res.email = this.email;
    }
    if(res.phonenumber == ""){
      res.phonenumber = this.phonenumber;
    }
    if(res.strutturaricettivatipology == ""){
      res.strutturaricettivatipology = this.strutturaricettivatipology;
    }

    console.log(res)
    
    this._struttService.deleteStruttura(this.id, this.jwt)
    .subscribe(data => console.log(data));

    
    this._struttService.postNewStrutturaRicettiva(res,this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
    
    });
  }

}

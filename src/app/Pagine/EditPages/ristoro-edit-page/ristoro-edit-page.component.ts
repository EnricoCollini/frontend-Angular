import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';

@Component({
  selector: 'app-ristoro-edit-page',
  templateUrl: './ristoro-edit-page.component.html',
  styleUrls: ['./ristoro-edit-page.component.css']
})
export class RistoroEditPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private _ristoService: RistoriService,
    private _router: Router) { }


  private jwt: string;
  private id: number;
  
  private name: string;
  private address: string;
  private city: string;
  private province: string;
  private latitude: number;
  private longitude: number;
  private email: string;
  private phonenumber: string;
  private ristorotypology: string;

  ngOnInit() {

    this.route.queryParams
      .subscribe(params =>{
        this.jwt = params.jwt
        this.id = params.thisristo;
      });


    this._ristoService.getRistoroWithId(this.id)
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
        this.ristorotypology = params.ristorotypology;
        console.log(this.id)
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
    if(res.ristorotypology == ""){
      res.ristorotypology = this.ristorotypology;
    }

    console.log(res)
    
    this._ristoService.postNewRistoro(res, this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });

    this._ristoService.deleteRistoro(this.id, this.jwt)
    .subscribe(data => console.log(data));
  }

}

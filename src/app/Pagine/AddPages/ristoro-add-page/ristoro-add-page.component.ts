import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmministratoreService } from 'src/app/Services/amministratoreService/amministratore.service';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';
import { IRistoro } from 'src/app/Services/ristoroService/ristoro';

@Component({
  selector: 'app-ristoro-add-page',
  templateUrl: './ristoro-add-page.component.html',
  styleUrls: ['./ristoro-add-page.component.css']
})
export class RistoroAddPageComponent implements OnInit {
  constructor(
    private _ristoService: RistoriService,
    private _router: Router,
    private route: ActivatedRoute,
    private _adminService: AmministratoreService) { }

    private jwt: string;
    private email: string;
    private ristori: IRistoro[] = [];
    private name: string;
    private theId: number;
    private adminId: number;
    private canAssociaAdmin = false;

  ngOnInit() {
    this.route.queryParams
    .subscribe(params =>{
      this.jwt = params.jwt;
      this.email = params.email;
    });

  }

  submitForm(form){
    let res = form.value;
    this.name = res.name;
    console.log(res);

    this._ristoService.postNewRistoro(res,this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati aggiunti correttamente");
        this.canAssociaAdmin = true;
      }else{
      window.alert(data);}
    });


  }

  associaAdmin(){
    this._ristoService.getRistoriFromDB()
    .subscribe(data=>{
      this.ristori = data;
    });
    for (let index = 0; index < this.ristori.length; index++) {
      if(this.name == this.ristori[index].name){
        this.theId = this.ristori[index].id;
      }
      console.log(this.theId);
    }
    this._adminService.getIdAdmin(this.email,this.jwt)
    .subscribe(data=>{
      console.log(data);
      this.adminId = data;
    })
    this._ristoService.associaAdmin(this.theId, this.adminId, this.jwt);
    console.log("rist: "+ this.theId + " admin; " + this.adminId);

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmministratoreService } from 'src/app/Services/amministratoreService/amministratore.service';
import { IStrutturaRicettiva } from 'src/app/Services/struttureRicettiveService/strutturaricettiva';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-struttura-ricettiva-add-page',
  templateUrl: './struttura-ricettiva-add-page.component.html',
  styleUrls: ['./struttura-ricettiva-add-page.component.css']
})
export class StrutturaRicettivaAddPageComponent implements OnInit {

  constructor(private _strutturaRicettiva: StruttureRicettiveService,
    private _router:Router,
    private route: ActivatedRoute,
    private _adminService: AmministratoreService){ }

  private jwt: string;
  private email: string;
  private strutture: IStrutturaRicettiva[] = [];
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
    console.log(res);
    this.name = res.name;
    this._strutturaRicettiva.postNewStrutturaRicettiva(res,this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati aggiunti correttamente");
        this.canAssociaAdmin = true;
      }else{
      window.alert(data);}
    });

  }

  associaAdmin(){

    this._strutturaRicettiva.getStruttureRicettiveFromDB()
    .subscribe((data)=>{
      this.strutture = data;
    });
    for (let index = 0; index < this.strutture.length; index++) {
      if(this.name == this.strutture[index].name){
        this.theId = this.strutture[index].id;
      }
      console.log(this.theId);
    }
    this._adminService.getIdAdmin(this.email,this.jwt)
    .subscribe(data=>{
      console.log(data);
      this.adminId = data;
    })
    this._strutturaRicettiva.associaAdmin(this.theId, this.adminId, this.jwt);
    console.log("str: "+ this.theId + " admin; " + this.adminId);

  }

}

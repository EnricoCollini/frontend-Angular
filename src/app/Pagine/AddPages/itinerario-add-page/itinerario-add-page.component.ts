import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmministratoreService } from 'src/app/Services/amministratoreService/amministratore.service';
import { IItinerario } from 'src/app/Services/itineraryService/itinerario';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';

@Component({
  selector: 'app-itinerario-add-page',
  templateUrl: './itinerario-add-page.component.html',
  styleUrls: ['./itinerario-add-page.component.css']
})
export class ItinerarioAddPageComponent implements OnInit {

  constructor(private _itinerarioService: ItinerarioService,
    private _router: Router,
    private route: ActivatedRoute,
    private _adminService: AmministratoreService) { }
  
    private jwt: string;
    private email: string;
    private itinerari: IItinerario[] = [];
    private name: string;
    private theId: number;
    private adminId: number;
    private canAssociaAdmin = false;

  ngOnInit() {
    this.route.queryParams
    .subscribe(params =>{
      this.jwt = params.jwt
      this.email = params.email;
    });

  }

  submitForm(form){
    let res = form.value;
    console.log(res);
    this.name = res.name;
    
    this._itinerarioService.postNewItinerario(res,this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati aggiunti correttamente");
        this.canAssociaAdmin = true;
      }else{
      window.alert(data);}
    });

  }


  associaAdmin(){

    this._itinerarioService.getItinerariFromDB()
    .subscribe(data=>{
      this.itinerari = data;
    });
    for (let index = 0; index < this.itinerari.length; index++) {
      if(this.name == this.itinerari[index].name){
        this.theId = this.itinerari[index].id;
      }
      console.log(this.theId);
    }
    this._adminService.getIdAdmin(this.email,this.jwt)
    .subscribe(data=>{
      console.log(data);
      this.adminId = data;
    })
    this._itinerarioService.associaAdmin(this.theId, this.adminId, this.jwt);
    console.log("iti: "+ this.theId + " admin; " + this.adminId);

  }

}

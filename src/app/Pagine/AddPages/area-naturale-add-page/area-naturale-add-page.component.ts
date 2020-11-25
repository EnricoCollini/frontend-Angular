import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmministratoreService } from 'src/app/Services/amministratoreService/amministratore.service';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';
import { IAreaNaturale } from 'src/app/Services/areaNaturaleService/areanturale';

@Component({
  selector: 'app-area-naturale-add-page',
  templateUrl: './area-naturale-add-page.component.html',
  styleUrls: ['./area-naturale-add-page.component.css']
})
export class AreaNaturaleAddPageComponent implements OnInit {

  private jwt: string;
  private email: string;
  private areeNaturali: IAreaNaturale[] = [];
  private name: string;
  private theId: number;
  private adminId: number;
  private canAssociaAdmin = false;

  constructor(private _router: Router,
    private _areaNaturaleService: AreaNaturaleService,
    private route: ActivatedRoute,
    private _adminService: AmministratoreService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        this.jwt = params.jwt
        this.email = params.email;
        console.log(this.email);
      });

      
  }

  submitForm(form){
    let res = form.value;
    this.name = res.name;
    console.log(res);

    this._areaNaturaleService.postNewAreaNaturale(res, this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati aggiunti correttamente");
        this.canAssociaAdmin = true;
      }else{
      window.alert(data);}
    });
  }

  associaAdmin(){
    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe((data:any)=>{
        this.areeNaturali = data;
      });
    for (let index = 0; index < this.areeNaturali.length; index++) {
      if(this.name == this.areeNaturali[index].name){
        this.theId = this.areeNaturali[index].id;
      }
      console.log(this.theId);
    }
    this._adminService.getIdAdmin(this.email,this.jwt)
    .subscribe(data=>{
      console.log(data);
      this.adminId = data;
    })
    this._areaNaturaleService.associaAdmin(this.theId, this.adminId, this.jwt);
    console.log("area: "+ this.theId + " admin; " + this.adminId);

  }

}

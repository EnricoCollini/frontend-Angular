import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-area-naturale-edit-page',
  templateUrl: './area-naturale-edit-page.component.html',
  styleUrls: ['./area-naturale-edit-page.component.css']
})

export class AreaNaturaleEditPageComponent implements OnInit, AfterContentInit{

  constructor(private route: ActivatedRoute,
    private _areaService: AreaNaturaleService,
    private _router: Router) { }

  private id: number;
  private jwt: string;
  private name: string;
  private description: string;
  private city: string;
  private province: string;
  private latitude: number;
  private longitude: number;
  private tipology: string;
  private defaultChoice: string;
  private choices = ["PARCONAZIONALE",
    "PARCOREGIONALE",
    "PARCOPROVINCIALE",
    "RISERVANATURALESTATALE",
    "RISERVANATURALEPROVINCIALE",
    "AREANATURALEPROTETTADIINTERESSELOCALE"]

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        this.jwt = params.jwt
        this.id = params.thisarea;
      });
      
  }

  ngAfterContentInit(){
    this._areaService.getAreaNaturaleWithId(this.id)
    .subscribe(data=>{
      this.id = data.id;
      console.log(this.id);
      this.name = data.name;
      console.log(this.name);
      this.description = data.description;
      this.city = data.city;
      this.province = data.province;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.tipology = data.areanaturaletypology;
      console.log(this.tipology);
      this.defaultChoice = this.tipology;
    });
  }

  submitForm(form){
    let res = form.value;
    console.log(typeof(res));
    if(res.name == ""){
      res.name = this.name;
    }
    if(res.description == ""){
      res.description = this.description;
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
    if(res.areanaturaletypology == ""){
      res.areanaturaletypology = this.tipology;
    }


    console.log(res);

    this._areaService.deleteAreaNaturale(this.id, this.jwt)
    .subscribe(data => console.log(data));

    this._areaService.postNewAreaNaturale(res, this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

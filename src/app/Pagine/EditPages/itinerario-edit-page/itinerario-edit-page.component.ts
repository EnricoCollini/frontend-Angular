import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';

@Component({
  selector: 'app-itinerario-edit-page',
  templateUrl: './itinerario-edit-page.component.html',
  styleUrls: ['./itinerario-edit-page.component.css']
})
export class ItinerarioEditPageComponent implements OnInit , AfterContentInit{

  constructor(private route: ActivatedRoute,
    private _itinService: ItinerarioService,
    private _router: Router) { }

  private id: number;
  private jwt: string;
  private name: string;
  private description: string;
  private startcity: string;
  private startprovince: string;
  private endcity: string;
  private endprovince: string;
  private startlatitude: number;
  private startlongitude: number;
  private endlatitude: number;
  private endlongitude: number;
  private track: string;
  

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        this.jwt = params.jwt
        this.id = params.thisarea;
      });
    }

  ngAfterContentInit(){
    this._itinService.getItinerarioWithId(this.id)
      .subscribe(params =>{
        console.log(params.name);
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.startcity = params.startcity;
        this.startprovince = params.startprovince;
        this.endcity = params.endcity;
        this.endprovince = params.endprovince;
        this.startlatitude = params.startlatitude;
        this.startlongitude = params.startlongitude;
        this.endlatitude = params.endlatitude;
        this.endlongitude = params.endlongitude;
        this.track = params.track;
        console.log(this.id)
      })
  }

  submitForm(form){
    let res = form.value;
    console.log(res);

    if(res.name == ""){
      res.name = this.name;
    }
    if(res.description == ""){
      res.description = this.description;
    }
    if(res.startcity == ""){
      res.startcity = this.startcity;
    }
    if(res.startprovince == ""){
      res.startprovince = this.startprovince;
    }
    if(res.endcity == ""){
      res.endcity = this.endcity;
    }
    if(res.endprovince == ""){
      res.endprovince = this.endprovince;
    }
    if(res.startlatitude == ""){
      res.startlatitude = this.startlatitude;
    }
    if(res.startlongitude == ""){
      res.startlongitude = this.startlongitude;
    }
    if(res.endlatitude == ""){
      res.endlatitude = this.endlatitude;
    }
    if(res.endlongitude == ""){
      res.endlongitude = this.endlongitude;
    }
    if(res.track == ""){
      res.track = this.track;
    }

    console.log(res)
    
    this._itinService.deleteItinerario(this.id,this.jwt)
    .subscribe(data => console.log(data));

    this._itinService.postNewItinerario(res,this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
     
    });
  }

}

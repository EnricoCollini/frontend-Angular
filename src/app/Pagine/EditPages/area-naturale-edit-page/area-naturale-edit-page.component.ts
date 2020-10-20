import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-area-naturale-edit-page',
  templateUrl: './area-naturale-edit-page.component.html',
  styleUrls: ['./area-naturale-edit-page.component.css']
})
export class AreaNaturaleEditPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private _areaService: AreaNaturaleService,
    private _router: Router) { }

  private id: number;
  private name: string;
  private description: string;
  private city: string;
  private province: string;
  private latitude: number;
  private longitude: number;
  private tipology: string;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        console.log(params.name);
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.city = params.city;
        this.province = params.province;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        this.tipology = "PARCO REGIONALE"
        console.log(this.id)
      })
  }

  submitForm(form){
    let res = form.value;
    console.log(typeof(res));

    if(res.Name == ""){
      res.Name = this.name;
    }
    if(res.Description == ""){
      res.Description = this.description;
    }
    if(res.City == ""){
      res.City = this.city;
    }
    if(res.Province == ""){
      res.Province = this.province;
    }
    if(res.Latitude == ""){
      res.Latitude = this.latitude;
    }
    if(res.Longitude == ""){
      res.Longitude = this.longitude;
    }
    if(res.Typology == ""){
      res.Typology = this.tipology;
    }

    console.log(res)
    
    this._areaService.deleteAreaNaturale(this.id)
    .subscribe(data => console.log(data));

    this._areaService.postNewAreaNaturale(res)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

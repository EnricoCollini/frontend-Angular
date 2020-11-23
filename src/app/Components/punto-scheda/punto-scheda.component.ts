import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PuntoService } from 'src/app/Services/puntoService/punto.service';

@Component({
  selector: 'app-punto-scheda',
  templateUrl: './punto-scheda.component.html',
  styleUrls: ['./punto-scheda.component.css']
})
export class PuntoSchedaComponent implements OnInit {

  private id:number
  private name:string
  private description:string
  private city:string
  private province:string
  private latitude:number
  private longitude:number
  

  constructor(private route : ActivatedRoute) {}
   

  ngOnInit() {

    this.route.queryParams
    .subscribe(params => {
      this.name = params.name;
      this.description = params.description;
      this.city = params.city;
      this.latitude = params.latitude;
      this.longitude = params.longitude;
      this.province = params.province;
    })
  }

}

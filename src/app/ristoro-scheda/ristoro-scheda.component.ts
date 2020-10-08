import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ristoro-scheda',
  templateUrl: './ristoro-scheda.component.html',
  styleUrls: ['./ristoro-scheda.component.css']
})
export class RistoroSchedaComponent implements OnInit {

  private name: string
  private address: string
  private city: string
  private province: string
  private email:string
  private latitude: number
  private longitude: number
  private phonenumber: string
  private ristorotypology: string

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        console.log(params);
        this.name = params.name;
        this.address= params.address;
        this.city= params.city;
        this.province= params.province;
        this.email=params.email;
        this.latitude= params.latitude;
        this.longitude= params.longitude;
        this.phonenumber= params.phonenumber;
        console.log(this.latitude)
      })
  }

}

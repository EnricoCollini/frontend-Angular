import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAreaNaturale } from '../areanturale';

@Component({
  selector: 'app-area-naturale-scheda',
  templateUrl: './area-naturale-scheda.component.html',
  styleUrls: ['./area-naturale-scheda.component.css']
})
export class AreaNaturaleSchedaComponent implements OnInit {
  private name: string;
  private description: string;
  private city: string;
  private province: string;
  private latitude: string;
  private longitude: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        console.log(params.name);
        this.name = params.name;
        this.description = params.description;
        this.city = params.city;
        this.province = params.province;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        console.log(this.latitude)
      })

  }

}

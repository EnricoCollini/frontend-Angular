import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  
  }

  public onFloatClick () {
    // do your magic
  }

  public addArea(){
    this.router.navigate(['/areenaturaliAdd']);

  }

  public addRisto(){
    this.router.navigate(['/ristoroAdd']);

  }

  public addStrutt(){
    this.router.navigate(['/strutturaAdd']);

  }

  public addIti(){
    this.router.navigate(['/itineraryAdd']);

  }


}

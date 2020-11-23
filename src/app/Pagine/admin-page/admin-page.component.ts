import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements  OnInit {

  constructor(private router: Router){}


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

  public openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }




}

import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements  OnInit {

  private token: string;
  private email: string;

  constructor(private router: Router,
    private route: ActivatedRoute){}


  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        console.log(params);
        this.token = params.jwt;
        this.email = params.email;
        console.log(this.token);
        console.log(this.email);
      })
  }


  public onFloatClick () {
    // do your magic
  }

  public addArea(){
    this.router.navigate(['/areenaturaliAdd'], { queryParams: { "jwt": this.token, "email": this.email}, queryParamsHandling: "merge" },);
  }

  public addRisto(){
    this.router.navigate(['/ristoroAdd'], { queryParams: { "jwt": this.token, "email": this.email}, queryParamsHandling: "merge" },);

  }

  public addStrutt(){
    this.router.navigate(['/strutturaAdd'], { queryParams: { "jwt": this.token, "email": this.email}, queryParamsHandling: "merge" },);

  }

  public addIti(){
    this.router.navigate(['/itineraryAdd'], { queryParams: { "jwt": this.token, "email": this.email}, queryParamsHandling: "merge" },);

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

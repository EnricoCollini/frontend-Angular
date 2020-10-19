import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itinerario-add-page',
  templateUrl: './itinerario-add-page.component.html',
  styleUrls: ['./itinerario-add-page.component.css']
})
export class ItinerarioAddPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitForm(form){
    let res = form.value;
    console.log(res);
  }

}

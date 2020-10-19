import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ristoro-add-page',
  templateUrl: './ristoro-add-page.component.html',
  styleUrls: ['./ristoro-add-page.component.css']
})
export class RistoroAddPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitForm(form){
    let res = form.value;
    console.log(res);
  }

}

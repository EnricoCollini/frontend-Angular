import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-struttura-ricettiva-add-page',
  templateUrl: './struttura-ricettiva-add-page.component.html',
  styleUrls: ['./struttura-ricettiva-add-page.component.css']
})
export class StrutturaRicettivaAddPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   submitForm(form){
    let res = form.value;
    console.log(res);
  }

}

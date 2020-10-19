import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-naturale-add-page',
  templateUrl: './area-naturale-add-page.component.html',
  styleUrls: ['./area-naturale-add-page.component.css']
})
export class AreaNaturaleAddPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitForm(form){
    let res = form.value;
    console.log(res);
  }

}

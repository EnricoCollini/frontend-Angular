import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associa-component',
  templateUrl: './associa-component.component.html',
  styleUrls: ['./associa-component.component.css']
})
export class AssociaComponentComponent implements OnInit {

  private name1: string;
  private name2: string;

  constructor() { }

  ngOnInit() {
  }


  submitForm(form){
    let res = form.value;
    this.name1 = res.name1;
    this.name2 = res.name2;
    console.log(this.name2);

  }

}

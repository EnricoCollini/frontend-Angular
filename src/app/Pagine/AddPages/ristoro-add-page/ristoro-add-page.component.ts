import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';

@Component({
  selector: 'app-ristoro-add-page',
  templateUrl: './ristoro-add-page.component.html',
  styleUrls: ['./ristoro-add-page.component.css']
})
export class RistoroAddPageComponent implements OnInit {
  constructor(
    private _ristoService: RistoriService,
    private _router: Router) { }



  ngOnInit() {
   
  }

  submitForm(form){
    let res = form.value;
    console.log(res);

    this._ristoService.postNewRistoro(res)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

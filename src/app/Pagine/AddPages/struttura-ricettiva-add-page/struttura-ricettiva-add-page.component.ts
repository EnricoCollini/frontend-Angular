import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-struttura-ricettiva-add-page',
  templateUrl: './struttura-ricettiva-add-page.component.html',
  styleUrls: ['./struttura-ricettiva-add-page.component.css']
})
export class StrutturaRicettivaAddPageComponent implements OnInit {

  constructor(private _strutturaRicettiva: StruttureRicettiveService,
    private _router:Router){ }

  ngOnInit() {
  }

   submitForm(form){
    let res = form.value;
    console.log(res);
    this._strutturaRicettiva.postNewStrutturaRicettiva(res)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

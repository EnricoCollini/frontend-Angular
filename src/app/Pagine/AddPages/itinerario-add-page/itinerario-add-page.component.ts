import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';

@Component({
  selector: 'app-itinerario-add-page',
  templateUrl: './itinerario-add-page.component.html',
  styleUrls: ['./itinerario-add-page.component.css']
})
export class ItinerarioAddPageComponent implements OnInit {

  constructor(private _itinerarioService: ItinerarioService,
    private _router: Router) { }

  ngOnInit() {
  }

  submitForm(form){
    let res = form.value;
    console.log(res);
    this._itinerarioService.postNewItinerario(res)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

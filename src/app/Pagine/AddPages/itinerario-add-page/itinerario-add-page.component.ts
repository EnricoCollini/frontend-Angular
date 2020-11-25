import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';

@Component({
  selector: 'app-itinerario-add-page',
  templateUrl: './itinerario-add-page.component.html',
  styleUrls: ['./itinerario-add-page.component.css']
})
export class ItinerarioAddPageComponent implements OnInit {

  constructor(private _itinerarioService: ItinerarioService,
    private _router: Router,
    private route: ActivatedRoute) { }
  
    private jwt;

  ngOnInit() {
    this.route.queryParams
    .subscribe(params =>{
      this.jwt = params.jwt
    });
  }

  submitForm(form){
    let res = form.value;
    console.log(res);
    
    this._itinerarioService.postNewItinerario(res,this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-area-naturale-add-page',
  templateUrl: './area-naturale-add-page.component.html',
  styleUrls: ['./area-naturale-add-page.component.css']
})
export class AreaNaturaleAddPageComponent implements OnInit {

  constructor(private _router: Router,
    private _areaNaturaleService: AreaNaturaleService) { }

  ngOnInit() {
  }

  submitForm(form){
    let res = form.value;
    console.log(res);

    this._areaNaturaleService.postNewAreaNaturale(res)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

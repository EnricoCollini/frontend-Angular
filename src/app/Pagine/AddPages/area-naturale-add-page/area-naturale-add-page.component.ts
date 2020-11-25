import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-area-naturale-add-page',
  templateUrl: './area-naturale-add-page.component.html',
  styleUrls: ['./area-naturale-add-page.component.css']
})
export class AreaNaturaleAddPageComponent implements OnInit {

  private jwt;

  constructor(private _router: Router,
    private _areaNaturaleService: AreaNaturaleService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        this.jwt = params.jwt
      });
  }

  submitForm(form){
    let res = form.value;
    console.log(res);

    this._areaNaturaleService.postNewAreaNaturale(res, this.jwt)
    .subscribe(data => {
      if(data == null){
        window.alert("dati modificati correttamente");
      }else{
      window.alert(data);}
      this._router.navigate(["admin"]);
    });
  }

}

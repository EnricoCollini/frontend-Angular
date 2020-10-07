import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaNaturaleService } from '../area-naturale.service';
import { StruttureRicettiveService } from '../strutture-ricettive.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  public areeNaturali = [];
  public struttureRicettive = [];
  public name = "";

  constructor(private route: ActivatedRoute,
    private _struttureRicettiveService: StruttureRicettiveService,
    private _areaNaturaleService: AreaNaturaleService,
    private router: Router) { }

  ngOnInit() {
    this._areaNaturaleService.getAreeNaturaliFromDB()
    .subscribe(data => {
      this.initializion();
      this.areeNaturali = data;
      console.log(this.areeNaturali.length);
      for (let index = 0; index < this.areeNaturali.length; index++) {
        if(this.areeNaturali[index].name == this.name){
          console.log(this.name);
          this.router.navigate(['/detail/', this.areeNaturali[index].latitude] ,{ queryParams: this.areeNaturali[index]});
        }
        
      }
    });

     this._struttureRicettiveService.getStruttureRicettiveFromDB()
    .subscribe(data=> {
      this.initializion();
      this.struttureRicettive = data
      console.log(this.struttureRicettive.length);
      for (let index = 0; index < this.struttureRicettive.length; index++) {
        if(this.struttureRicettive[index].name == this.name){
          console.log(this.name);
          this.router.navigate(['/detailStrut/', this.struttureRicettive[index].latitude] ,{ queryParams: this.struttureRicettive[index]});
        }
        
      }
    });


  }


  initializion(){
    this.route.params.subscribe(params => {
      this.name = params['nome'];
      console.log(this.name);
    });
  }


}

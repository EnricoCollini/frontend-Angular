import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-aree-naturali-table',
  templateUrl: './aree-naturali-table.component.html',
  styleUrls: ['./aree-naturali-table.component.css']
})
export class AreeNaturaliTableComponent implements OnInit {
  @Input() 
  private jwt: string;


  public areeNaturali = [];
  constructor(private _areaNaturaleService: AreaNaturaleService,
    private router: Router) { }

  ngOnInit() {
    this.getAree();
  }

  public getAree(){
    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe(data => this.areeNaturali = data);
  }

  public deleteArea(lid){
    console.log(lid);
    this._areaNaturaleService.deleteAreaNaturale(lid,this.jwt)
    .subscribe(data => {
      console.log(data);
      this.getAree();
    } 
    )
  }

  public editArea(id){
    const route = '/areaEdit/' + id;
    this.router.navigate([route]);
  }

}

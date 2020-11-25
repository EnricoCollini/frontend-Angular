import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-strutture-ricettive-table',
  templateUrl: './strutture-ricettive-table.component.html',
  styleUrls: ['./strutture-ricettive-table.component.css']
})
export class StruttureRicettiveTableComponent implements OnInit {
  @Input() 
  private jwt: string;

  public strutture = [];
  constructor(private _struttureService: StruttureRicettiveService,
    private router:Router) { }

  ngOnInit() {
    this.getStrutture();
  }

  getStrutture(){
    this._struttureService.getStruttureRicettiveFromDB()
    .subscribe(data => this.strutture = data);
  }

  public deleteStruttura(lid){
    console.log(lid);
    this._struttureService.deleteStruttura(lid, this.jwt)
    .subscribe(data => {
      console.log(data);
      this.getStrutture();
    } 
    )
  }

  goEdit(strutt){
    this.router.navigate(['/strutturaEdit/'+strutt.id] , { queryParams: { "jwt": this.jwt, "thisstrutt": strutt.id } });
  }
  

  

}

import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';

@Component({
  selector: 'app-ristori-table',
  templateUrl: './ristori-table.component.html',
  styleUrls: ['./ristori-table.component.css']
})
export class RistoriTableComponent implements OnInit {
  @Input() 
  private jwt: string;

  public ristori = [];
  constructor(private _ristoriService: RistoriService,
    private router: Router) { }

  ngOnInit() {
    this.getRistori();
  }

  getRistori(){
    this._ristoriService.getRistoriFromDB()
    .subscribe(data => this.ristori = data);
  }

  public deleteRistoro(lid){
    
    console.log(lid);
    this._ristoriService.deleteRistoro(lid, this.jwt)
    .subscribe(data => {
      console.log(data);
      this.getRistori();
    } 
    )
  }

  goEdit(risto){
    this.router.navigate(['/ristoroEdit/'+risto.id] , { queryParams: { "jwt": this.jwt, "thisristo": risto.id } });
  }

}

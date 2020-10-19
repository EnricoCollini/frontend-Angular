import { Component, OnInit } from '@angular/core';
import { RistoriService } from 'src/app/Services/ristoroService/ristori.service';

@Component({
  selector: 'app-ristori-table',
  templateUrl: './ristori-table.component.html',
  styleUrls: ['./ristori-table.component.css']
})
export class RistoriTableComponent implements OnInit {

  public ristori = [];
  constructor(private _ristoriService: RistoriService) { }

  ngOnInit() {
    this._ristoriService.getRistoriFromDB()
      .subscribe(data => this.ristori = data);
  }

}

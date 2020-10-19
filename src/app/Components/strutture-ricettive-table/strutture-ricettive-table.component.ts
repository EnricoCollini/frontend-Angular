import { Component, OnInit } from '@angular/core';
import { StruttureRicettiveService } from 'src/app/Services/struttureRicettiveService/strutture-ricettive.service';

@Component({
  selector: 'app-strutture-ricettive-table',
  templateUrl: './strutture-ricettive-table.component.html',
  styleUrls: ['./strutture-ricettive-table.component.css']
})
export class StruttureRicettiveTableComponent implements OnInit {

  public strutture = [];
  constructor(private _struttureService: StruttureRicettiveService) { }

  ngOnInit() {
    this._struttureService.getStruttureRicettiveFromDB()
      .subscribe(data => this.strutture = data);
  }
}

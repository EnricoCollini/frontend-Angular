import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';

@Component({
  selector: 'app-itinerari-table',
  templateUrl: './itinerari-table.component.html',
  styleUrls: ['./itinerari-table.component.css']
})
export class ItinerariTableComponent implements OnInit {

  public itinerari = [];
  constructor(private _itinerariService: ItinerarioService) { }

  ngOnInit() {
    this._itinerariService.getItinerariFromDB()
      .subscribe(data => this.itinerari = data);
  }

}

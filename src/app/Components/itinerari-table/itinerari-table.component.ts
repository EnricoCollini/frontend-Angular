import { Component, Input, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/Services/itineraryService/itinerario.service';

@Component({
  selector: 'app-itinerari-table',
  templateUrl: './itinerari-table.component.html',
  styleUrls: ['./itinerari-table.component.css']
})
export class ItinerariTableComponent implements OnInit {
  @Input() 
  private jwt: string;

  public itinerari = [];
  constructor(private _itinerariService: ItinerarioService) { }

  ngOnInit() {
    this.getItinerari();
  }

  getItinerari(){
    this._itinerariService.getItinerariFromDB()
    .subscribe(data => this.itinerari = data);
  }

  public deleteItinerario(lid){
    console.log(lid);
    this._itinerariService.deleteItinerario(lid,this.jwt)
    .subscribe(data => {
      console.log(data);
      this.getItinerari();
    } 
    )
  }

}

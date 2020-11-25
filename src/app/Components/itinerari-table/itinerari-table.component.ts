import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _itinerariService: ItinerarioService,
    private router: Router) { }

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


  goEdit(area){
    this.router.navigate(['/itinerarioEdit/'+area.id] , { queryParams: { "jwt": this.jwt, "thisiti": area.id } });
  }

}

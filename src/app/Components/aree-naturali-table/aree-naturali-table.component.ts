import { Component, OnInit } from '@angular/core';
import { AreaNaturaleService } from 'src/app/Services/areaNaturaleService/area-naturale.service';

@Component({
  selector: 'app-aree-naturali-table',
  templateUrl: './aree-naturali-table.component.html',
  styleUrls: ['./aree-naturali-table.component.css']
})
export class AreeNaturaliTableComponent implements OnInit {
  
  public areeNaturali = [];
  constructor(private _areaNaturaleService: AreaNaturaleService) { }

  ngOnInit() {
    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe(data => this.areeNaturali = data);
  }

}

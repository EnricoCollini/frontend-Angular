import { Component, OnInit } from '@angular/core';
import { AreaNaturaleService } from '../area-naturale.service';
import { IAreaNaturale } from '../areanturale';

@Component({
  selector: 'app-aree-naturali-list',
  templateUrl: './aree-naturali-list.component.html',
  styleUrls: ['./aree-naturali-list.component.css']
})
export class AreeNaturaliListComponent implements OnInit {

  public areeNaturali = [];
  constructor(private _areaNaturaleService: AreaNaturaleService) { }

  ngOnInit() {
    //this.areeNaturali = this._areaNaturaleService.getAreeNaturali();
    this._areaNaturaleService.getAreeNaturaliFromDB()
      .subscribe(data => this.areeNaturali = data);

  }

}

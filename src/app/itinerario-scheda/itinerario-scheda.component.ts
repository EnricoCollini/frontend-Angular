import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itinerario-scheda',
  templateUrl: './itinerario-scheda.component.html',
  styleUrls: ['./itinerario-scheda.component.css']
})
export class ItinerarioSchedaComponent implements OnInit {

  private id: number;
  private  name: string;
  private  description: string;
  private  startcity: string;
  private  startprovince: string;
  private  endcity: string;
  private  endprovince: string;
private  track: string;
  private obj = {a: 123, b: "4 5 6"};
  private data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.obj));
  private link = "data:'" + this.data;
  private sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.link);

	private startlatitude: number; 
  private  startlongitude: number;
  private  endlatitude: number;
  private  endlongitude: number;
  
  
  constructor(private route: ActivatedRoute,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params =>{
        console.log(params.name);
        this.name = params.name;
        console.log(this.name);
        this.description = params.description;
        console.log(this.description);
        this.startcity = params.startcity;
        console.log(this.startcity);
        this.startprovince = params.startprovince;
        console.log(this.startprovince);
        this.startlatitude = params.startlatitude;
        this.startlongitude = params.startlongitude;
        this.endcity = params.endcity;
        this.endprovince = params.endprovince;
        this.endlatitude = params.endlatitude;
        this.endlongitude = params.endlongitude;
        this.track = params.track;
        console.log(this.track);
        console.log(this.name)
        this.data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.track));
        this.link = "data:'" + this.data;
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.link);
      })
  }

  sanitize(){
    return this.sanitizer.bypassSecurityTrustUrl(this.link);
}

}

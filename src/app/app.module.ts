import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { AppRoutingModule, routingComponents } from './/app-routing.module';
import { AreaNaturaleService } from './Services/areaNaturaleService/area-naturale.service';
import { RistoriService } from './Services/ristoroService/ristori.service'

import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './Layout/footer/footer.component';
import { AreaNaturaleSchedaComponent } from './Components/area-naturale-scheda/area-naturale-scheda.component';
import { MappaComponent } from './Components/mappa/mappa.component';
import { RedirectComponent } from './redirect/redirect.component';
import { StrutturaRicettivaSchedaComponent } from './Components/struttura-ricettiva-scheda/struttura-ricettiva-scheda.component';
import { RistoroSchedaComponent } from './Components/ristoro-scheda/ristoro-scheda.component';
import { ItinerarioSchedaComponent } from './Components/itinerario-scheda/itinerario-scheda.component';
import { ItineraryMakerComponent } from './Components/itinerary-maker/itinerary-maker.component';
import { MakerComponent } from './Pagine/maker/maker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    routingComponents,
    FooterComponent,
    AreaNaturaleSchedaComponent,
    MappaComponent,
    RedirectComponent,
    StrutturaRicettivaSchedaComponent,
    RistoroSchedaComponent,
    ItinerarioSchedaComponent,
    ItineraryMakerComponent,
    MakerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AreaNaturaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

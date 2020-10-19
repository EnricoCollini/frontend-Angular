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
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AutenticationComponent } from './Pagine/autentication/autentication.component';
import { AdminPageComponent } from './Pagine/admin-page/admin-page.component';
import { AreeNaturaliTableComponent } from './Components/aree-naturali-table/aree-naturali-table.component';
import { StruttureRicettiveTableComponent } from './Components/strutture-ricettive-table/strutture-ricettive-table.component';
import { RistoriTableComponent } from './Components/ristori-table/ristori-table.component';
import { ItinerariTableComponent } from './Components/itinerari-table/itinerari-table.component';

const firebaseConfig = {
  apiKey: "AIzaSyCQw6Ds-43zwoUPA3It_pnu6Ulk5eDkoh0",
  authDomain: "project-aut.firebaseapp.com",
  databaseURL: "https://project-aut.firebaseio.com",
  projectId: "project-aut",
  storageBucket: "project-aut.appspot.com",
  messagingSenderId: "729276793248",
  appId: "1:729276793248:web:22be3038da52bed81f24c5"
};

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
    MakerComponent,
    AutenticationComponent,
    AdminPageComponent,
    AreeNaturaliTableComponent,
    StruttureRicettiveTableComponent,
    RistoriTableComponent,
    ItinerariTableComponent,

  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AreaNaturaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

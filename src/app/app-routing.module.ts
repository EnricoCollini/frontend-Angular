import { PuntoSchedaComponent } from './Components/punto-scheda/punto-scheda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AreeNaturaliListComponent } from './Pagine/aree-naturali-list/aree-naturali-list.component';
import { RicercaComponent } from './Pagine/ricerca/ricerca.component';
import { AreaNaturaleSchedaComponent } from './Components/area-naturale-scheda/area-naturale-scheda.component';
import { RedirectComponent } from './redirect/redirect.component';
import { StrutturaRicettivaSchedaComponent } from './Components/struttura-ricettiva-scheda/struttura-ricettiva-scheda.component';
import { RistoroSchedaComponent } from './Components/ristoro-scheda/ristoro-scheda.component';
import { ItinerarioSchedaComponent } from './Components/itinerario-scheda/itinerario-scheda.component';
import { ItineraryMakerComponent } from './Components/itinerary-maker/itinerary-maker.component';
import { MakerComponent } from './Pagine/maker/maker.component';
import { AutenticationComponent } from './Pagine/autentication/autentication.component';
import { AdminPageComponent } from './Pagine/admin-page/admin-page.component';
import { AreaNaturaleAddPageComponent } from './Pagine/AddPages/area-naturale-add-page/area-naturale-add-page.component';
import { RistoroAddPageComponent } from './Pagine/AddPages/ristoro-add-page/ristoro-add-page.component';
import { ItinerarioAddPageComponent } from './Pagine/AddPages/itinerario-add-page/itinerario-add-page.component';
import { StrutturaRicettivaAddPageComponent } from './Pagine/AddPages/struttura-ricettiva-add-page/struttura-ricettiva-add-page.component';
import { AreaNaturaleEditPageComponent } from './Pagine/EditPages/area-naturale-edit-page/area-naturale-edit-page.component';
import { RistoroEditPageComponent } from './Pagine/EditPages/ristoro-edit-page/ristoro-edit-page.component';
import { ItinerarioEditPageComponent } from './Pagine/EditPages/itinerario-edit-page/itinerario-edit-page.component';
import { StrutturaRicettivaEditPageComponent } from './Pagine/EditPages/struttura-ricettiva-edit-page/struttura-ricettiva-edit-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'areenaturali',
    pathMatch: 'full'
  },
  {path: 'areenaturali', component: AreeNaturaliListComponent},
  {path: 'ricerca', component: RicercaComponent},
  {path: 'itinerarymaker', component: MakerComponent},
  {path: 'login', component: AutenticationComponent},
  {path: 'admin', component: AdminPageComponent},

  {path: 'areenaturaliAdd', component: AreaNaturaleAddPageComponent},
  {path: 'ristoroAdd', component: RistoroAddPageComponent},
  {path: 'itineraryAdd', component: ItinerarioAddPageComponent},
  {path: 'strutturaAdd', component: StrutturaRicettivaAddPageComponent},

  {path: 'areanaturaleEdit/:id', component: AreaNaturaleEditPageComponent},
  {path: 'ristoroEdit/:id', component: RistoroEditPageComponent},
  {path: 'itinerarioEdit/:id', component: ItinerarioEditPageComponent},
  {path: 'strutturaEdit/:id', component: StrutturaRicettivaEditPageComponent},
  


  
  { path: 'detail/:lat', component: AreaNaturaleSchedaComponent },
  { path: 'detailStrut/:lat', component: StrutturaRicettivaSchedaComponent },
  { path: 'detailRisto/:lat', component: RistoroSchedaComponent},
  { path: 'detailIti/:lat', component: ItinerarioSchedaComponent},
  { path: 'detailPunto/:lat', component:PuntoSchedaComponent},
  
  
  {path: 'redirect/:nome', component: RedirectComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [AreeNaturaliListComponent,
                                  RicercaComponent,
                                ItineraryMakerComponent]

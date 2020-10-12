import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AreeNaturaliListComponent } from './aree-naturali-list/aree-naturali-list.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { AreaNaturaleSchedaComponent } from './area-naturale-scheda/area-naturale-scheda.component';
import { RedirectComponent } from './redirect/redirect.component';
import { StrutturaRicettivaSchedaComponent } from './struttura-ricettiva-scheda/struttura-ricettiva-scheda.component';
import { RistoroSchedaComponent } from './ristoro-scheda/ristoro-scheda.component';
import { ItinerarioSchedaComponent } from './itinerario-scheda/itinerario-scheda.component';
import { ItineraryMakerComponent } from './itinerary-maker/itinerary-maker.component';
import { MakerComponent } from './maker/maker.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'areenaturali',
    pathMatch: 'full'
  },
  {path: 'areenaturali', component: AreeNaturaliListComponent},
  {path: 'ricerca', component: RicercaComponent},
  {path: 'itinerarymaker', component: MakerComponent},
  
  { path: 'detail/:lat', component: AreaNaturaleSchedaComponent },
  { path: 'detailStrut/:lat', component: StrutturaRicettivaSchedaComponent },
  { path: 'detailRisto/:lat', component: RistoroSchedaComponent},
  { path: 'detailIti/:lat', component: ItinerarioSchedaComponent},
  
  
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

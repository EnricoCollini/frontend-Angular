import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AreeNaturaliListComponent } from './aree-naturali-list/aree-naturali-list.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { AreaNaturaleSchedaComponent } from './area-naturale-scheda/area-naturale-scheda.component';
import { RedirectComponent } from './redirect/redirect.component';
import { StrutturaRicettivaSchedaComponent } from './struttura-ricettiva-scheda/struttura-ricettiva-scheda.component';
import { RistoroSchedaComponent } from './ristoro-scheda/ristoro-scheda.component';

const routes: Routes = [
  {path: 'areenaturali', component: AreeNaturaliListComponent},
  {path: 'ricerca', component: RicercaComponent},
  {
    path: '',
    redirectTo: 'areenaturali',
    pathMatch: 'full'
  },
  { path: 'detail/:lat', component: AreaNaturaleSchedaComponent },
  { path: 'detailStrut/:lat', component: StrutturaRicettivaSchedaComponent },
  { path: 'detailRisto/:lat', component: RistoroSchedaComponent},
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
                                  RicercaComponent]

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AreeNaturaliListComponent } from './aree-naturali-list/aree-naturali-list.component';
import { RicercaComponent } from './ricerca/ricerca.component';

const routes: Routes = [
  {path: 'areenaturali', component: AreeNaturaliListComponent},
  {path: 'ricerca', component: RicercaComponent}
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

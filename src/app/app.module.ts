import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule, routingComponents } from './/app-routing.module';
import { AreaNaturaleService } from './area-naturale.service';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { AreaNaturaleSchedaComponent } from './area-naturale-scheda/area-naturale-scheda.component';
import { MappaComponent } from './mappa/mappa.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    routingComponents,
    FooterComponent,
    AreaNaturaleSchedaComponent,
    MappaComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AreaNaturaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

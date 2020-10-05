import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AreeNaturaliListComponent } from './aree-naturali-list/aree-naturali-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AreeNaturaliListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

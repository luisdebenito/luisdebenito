import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { EducationComponent } from './education/education.component';
import { DublinComponent } from './dublin/dublin.component';
import { RusiaComponent } from './rusia/rusia.component';
import { MaltaComponent } from './malta/malta.component';
import { VeneciaComponent } from './venecia/venecia.component';
import { SueciaComponent } from './suecia/suecia.component';
import { GermanyComponent } from './germany/germany.component';
import { IndiaComponent } from './india/india.component';
import { CorunaComponent } from './coruna/coruna.component';
import { ForliComponent } from './forli/forli.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SantiusteComponent } from './santiuste/santiuste.component';
import { FinalComponent } from './final/final.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    EducationComponent,
    DublinComponent,
    RusiaComponent,
    MaltaComponent,
    VeneciaComponent,
    SueciaComponent,
    GermanyComponent,
    IndiaComponent,
    CorunaComponent,
    ForliComponent,
    SantiusteComponent,
    FinalComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

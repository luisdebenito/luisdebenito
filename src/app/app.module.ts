import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { SegoviaComponent } from './segovia/segovia.component';
import { DublinComponent } from './dublin/dublin.component';
import { IowaComponent } from './iowa/iowa.component';
import { Madrid1Component } from './madrid1/madrid1.component';
import { RusiaComponent } from './rusia/rusia.component';
import { Madrid2Component } from './madrid2/madrid2.component';
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

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    SegoviaComponent,
    DublinComponent,
    IowaComponent,
    Madrid1Component,
    RusiaComponent,
    Madrid2Component,
    MaltaComponent,
    VeneciaComponent,
    SueciaComponent,
    GermanyComponent,
    IndiaComponent,
    CorunaComponent,
    ForliComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

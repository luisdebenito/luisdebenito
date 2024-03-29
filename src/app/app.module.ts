import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { EducationComponent } from './education/education.component';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DockModule } from 'primeng/dock';
import { ExperienceComponent } from './experience/experience.component';
import { MusicComponent } from './music/music.component';
import { TripComponent } from './trip/trip.component';
import { CodeComponent } from './code/code.component';
import { SportComponent } from './sport/sport.component';
import { FinalComponent } from './misc/final.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    EducationComponent,
    ExperienceComponent,
    MusicComponent,
    TripComponent,
    CodeComponent,
    SportComponent,
    FinalComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, ButtonModule, DockModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

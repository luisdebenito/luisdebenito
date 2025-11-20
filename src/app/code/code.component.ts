import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent {
  videourls: { title: string; url: SafeResourceUrl }[] = [];

  public rawUrls: { title: string; url: string }[] = [
    {
      title: 'Building the Cheapest DJ Setup Because Price ≠ Skill 🤔',
      url: 'https://www.youtube.com/embed/brEwyMsq8Vg?si=dvzk9koXnWLGdCUt',
    },
    {
      title: 'THIS IS HOW I CREATED ALERTACOCHES APP',
      url: 'https://www.youtube.com/embed/C8XWavKias4?si=7ngyA7jJ2I2Nl7fe',
    },
    {
      title: 'WHO IS THE REAL GOAT OF TENNIS (with data)',
      url: 'https://www.youtube.com/embed/MrP_TRuj6tQ?si=sHR_Rf893TcepZuc',
    },
    {
      title: 'How did I become a DJ ',
      url: 'https://www.youtube.com/embed/G42vX_e1olE?si=ZQhK9xmaXQdhR-Tp',
    },
    {
      title: 'Mente Discontinua - Chapter 1 ',
      url: 'https://www.youtube.com/embed/3DEdVp8rHNM?si=HO9luO3epuZwkZnr',
    },

    {
      title: 'I HAVE CREATED AN ALTER EGO AND NOW IT IS AN INFLUENCER',
      url: 'https://www.youtube.com/embed/ipnym-3Hl3A?si=7iE3V6JEIAUI9zOf',
    },
    {
      title: 'I have created a videogame for my Grandpa',
      url: 'https://www.youtube.com/embed/Y7y9CG0yl4Q?si=me2z1_yN8GSQ3qKZ',
    },
    {
      title: 'I HAVE CREATED VISUALS FOR MY PARTY',
      url: 'https://www.youtube.com/embed/gz09-7b2h9o?si=moYLec3HIvIDBm2v',
    },
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.rawUrls.forEach((element) => {
      this.videourls.push({
        title: element.title,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(element.url),
      });
    });
  }
}

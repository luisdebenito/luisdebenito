import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent {
  videourls: SafeResourceUrl[] = [];

  public rawUrls: string[] = [
    'https://www.youtube.com/embed/UdRM20NL0oY?si=1UdzgDE71K133uOl',
    'https://www.youtube.com/embed/Z_HCiCQPM58?si=OvQk2nKjE3WTaWLK',
    'https://www.youtube.com/embed/SbI0UjmGgSY?si=pFWHldjvxKMSLkwF',
    'https://www.youtube.com/embed/KGH9TCKwkMw?si=LssKv5XUSq1xkFIE',
    'https://www.youtube.com/embed/lhwLeB0mXjU?si=bNByZOGNmqzGm_Oy&amp;start=2178',
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.videourls = this.rawUrls.map((url) =>
      this.sanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}

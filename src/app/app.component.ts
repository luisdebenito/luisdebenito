import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Luis de Benito';

  constructor() { }

  @ViewChild('cnt') container!: ElementRef;

  public indexSelected: number = 0;
  public headers: { name: string; icon: string; top: number; right: number }[] =
    [
      {
        name: 'Info',
        icon: 'id-card',

        top: 0,
        right: 0,
      },
      {
        name: 'Education',
        icon: 'user-plus',

        top: 0,
        right: 0,
      },
      {
        name: 'Experience',
        icon: 'star',

        top: 0,
        right: 0,
      },
      {
        name: 'Music',
        icon: 'volume-up',

        top: 0,
        right: 0,
      },
      {
        name: 'Trips',
        icon: 'map',

        top: 0,
        right: 0,
      },
      {
        name: 'Code',
        icon: 'code',

        top: 0,
        right: 0,
      },
      {
        name: 'Sports',
        icon: 'flag',

        top: 0,
        right: 0,
      },
      {
        name: 'Misc',
        icon: 'globe',

        top: 0,
        right: 0,
      },
    ];

  ngOnInit(): void {
    this.headers.forEach((it, index: number) => {
      const angle: number = Math.floor((360 / this.headers.length) * index);
      let x = Math.round(150 * Math.cos(angle));
      let y = Math.round(150 * Math.sin(angle));
      it.right = x + 200;
      it.top = y + 200;
    });
  }

  public moving: boolean = false;
  public tabChanged(events: any): void {
    if (events.index == this.indexSelected) return;
    this.indexSelected = events.index;
    const nextElement = this.headers[this.indexSelected];
  }
}

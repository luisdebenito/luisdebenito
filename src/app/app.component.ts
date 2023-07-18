import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Luis de Benito';

  constructor() {}

  @ViewChild('cnt') container!: ElementRef;

  public indexSelected: number = 0;
  public headers: { name: string; icon: string; i: number }[] = [
    {
      name: 'Info',
      icon: 'id-card',
      i: 0,
    },
    {
      name: 'Education',
      icon: 'user-plus',
      i: 1,
    },
    {
      name: 'Experience',
      icon: 'star',
      i: 2,
    },
    {
      name: 'Music',
      icon: 'volume-up',
      i: 3,
    },
    {
      name: 'Trips',
      icon: 'map',
      i: 4,
    },
    {
      name: 'Code',
      icon: 'code',
      i: 5,
    },
    {
      name: 'Sports',
      icon: 'flag',
      i: 6,
    },
    {
      name: 'Misc',
      icon: 'globe',
      i: 7,
    },
  ];

  public tabChanged(index: number): void {
    setTimeout(() => {
      this.container.nativeElement.scrollTop = 0;
    }, 10);
    this.indexSelected = index;
  }
}

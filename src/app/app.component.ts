import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ostoo';
  private mapbox = mapboxgl as typeof mapboxgl;
  private map!: mapboxgl.Map;
  private style: string = 'mapbox://styles/mapbox/streets-v9';

  public showContact: boolean = false;
  private audio: any;
  public selected: number = 0;
  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [0, 0],
      interactive: false,
    });
    this.initMap();

    this.audio = new Audio();
    this.audio.src = '../../../assets/song.mp3';
    this.audio.load();
  }

  public playing: boolean = false;
  public playAudio() {
    try {
      this.audio.play();
      this.playing = true;
    } catch { }
  }

  public pauseAudio() {
    try {
      this.audio.pause();
      this.playing = false;
    } catch { }
  }

  private initMap(): void {
    this.drawLocations();
  }

  private generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  public locations: { lt: [number, number] }[] = [
    {
      lt: [0, 0],
    },
    {
      lt: [40.951807, -4.105901], //Segovia
    },
    {
      lt: [53.338793, -6.281146], //dublin
    },
    {
      lt: [42.025309, -93.626722], //iowa
    },
    {
      lt: [40.429561, -3.713232], //madrid
    },
    {
      lt: [59.891037, 30.319812], //rusia
    },
    {
      lt: [40.4054236, -3.7012379], //madrid2
    },
    {
      lt: [35.965471, 14.391707], //malta
    },
    {
      lt: [45.508237, 12.267826], //venecia
    },
    {
      lt: [59.333226, 18.06828], //Suecia
    },
    {
      lt: [49.373385, 10.180248], //rotemburg
    },
    {
      lt: [17.469947, 78.422454], //india
    },
    {
      lt: [43.365726, -8.411274], //coruña
    },
    {
      lt: [44.221248, 12.05746], //Forli
    },
    {
      lt: [41.15907, -4.570329], //Santiuste
    },
    {
      lt: [40.429492, -3.713082], //madrid3
    },
  ];

  private drawLocations(): void {
    this.locations.forEach((loc) => {
      if (loc.lt[0] == 0) return;
      // Add rooms to the map.
      new mapboxgl.Marker({ color: this.generateRandomColor() })
        .setLngLat([loc.lt[1], loc.lt[0]])
        .addTo(this.map);
    });
  }

  public back(): void {
    if (this.selected <= 0) return;
    this.selected--;
    this.fly();
  }

  public next(): void {
    if (this.selected >= this.locations.length - 1) return;
    this.selected++;
    this.fly();
  }

  public moving: boolean = false;
  private fly() {
    this.moving = true;
    this.map.flyTo({
      center: [
        this.locations[this.selected].lt[1],
        this.locations[this.selected].lt[0],
      ],
      essential: true,
      speed: 1.3,
      curve: 2.2,
    });
    let flag: boolean = false;
    this.map.on('moveend', () => {
      if (!flag) this.moving = false;
      flag = true;
    });
  }
}

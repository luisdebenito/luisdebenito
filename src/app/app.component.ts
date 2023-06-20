import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  private style: string = 'mapbox://styles/mapbox/light-v11';

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  @ViewChild('cnt') container!: ElementRef;

  public indexSelected: number = 0;
  public headers: { name: string; icon: string; lt: [number, number] }[] = [
    {
      name: 'Info',
      icon: 'id-card',
      lt: [41.15907, -4.570329], //santiuste
    },
    {
      name: 'Education',
      icon: 'user-plus',
      lt: [40.429561, -3.713232], //madrid
    },
    {
      name: 'Experience',
      icon: 'star',
      lt: [45.508237, 12.267826], //venecia
    },
    {
      name: 'Music',
      icon: 'volume-up',

      lt: [59.891037, 30.319812], //rusia
    },
    {
      name: 'Trips',
      icon: 'map',
      lt: [17.469947, 78.422454], //india
    },
    {
      name: 'Code',
      icon: 'code',
      lt: [42.026967, -93.629812], //iowa
    },
    {
      name: 'Sports',
      icon: 'flag',
      lt: [49.373385, 10.180248], //rothenburg
    },
    {
      name: 'Misc',
      icon: 'globe',
      lt: [59.333226, 18.06828], //suecia
    },
  ];

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [0, 0],
      interactive: false,
    });
    this.initMap();
    setTimeout(() => {
      this.flyTo(this.headers[0].lt);
    }, 50);
  }

  private initMap(): void {
    this.drawLocations();
  }

  private generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  private drawLocations(): void {
    this.headers.forEach((loc) => {
      // Add rooms to the map.
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML =
        ' <i class="pi pi-' + loc.icon + '"></i> <p>' + loc.name + '</p>';

      new mapboxgl.Marker({
        color: this.generateRandomColor(),
        element: markerElement,
      })
        .setLngLat([loc.lt[1], loc.lt[0]])
        .addTo(this.map);
    });
  }

  public tabChanged(events: any): void {
    if (events.index == this.indexSelected) return;
    this.indexSelected = events.index;
    const nextElement = this.headers[this.indexSelected];
    this.flyTo(nextElement.lt);
  }

  // p-tabview - nav - content

  public moving: boolean = false;
  public flyTo(lt: [number, number]) {
    this.moving = true;
    this.map.flyTo({
      center: [lt[1], lt[0]],
      essential: true,
      speed: 1.4,
      curve: 2.2,
    });
    let flag: boolean = false;
    this.map.on('moveend', () => {
      if (!flag) {
        this.moving = false;
        setTimeout(() => {
          this.container.nativeElement.scrollTop = 0;
        }, 5);
      }
      flag = true;
    });
  }
}

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ostoo';
  private mapbox = mapboxgl as typeof mapboxgl;
  private map!: mapboxgl.Map;
  private style: string = 'mapbox://styles/mapbox/navigation-night-v1';

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }


  public indexSelected: number = 0;
  public headers: { name: string, icon: string, lt: [number, number] }[] = [{
    name: "Info", icon: "id-card", lt: [41.15907, -4.570329] //santiuste
  }, {
    name: "Education", icon: "user-plus", lt: [40.429561, -3.713232] //madrid
  }, {
    name: "Experience", icon: "star", lt: [45.508237, 12.267826] //venecia
  }, {
    name: "Music", icon: "volume-up", lt: [59.333226, 18.06828] //suecia
  }, {
    name: "Trips", icon: "map", lt: [59.891037, 30.319812]//rusia
  }, {
    name: "Code", icon: "code", lt: [49.373385, 10.180248] //rothenburg
  }, {
    name: "Sports", icon: "flag", lt: [40.951807, -4.105901]//segovia
  }, {
    name: "Misc", icon: "globe", lt: [17.469947, 78.422454]//india
  }]

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
      this.flyTo(this.headers[0].lt)
    }, 300)
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
      new mapboxgl.Marker({ color: this.generateRandomColor() })
        .setLngLat([loc.lt[1], loc.lt[0]])
        .addTo(this.map);
    });
  }

  public tabChanged(events: any): void {
    if (events.index == this.indexSelected) return;
    this.indexSelected = events.index;
    const nextElement = this.headers[this.indexSelected];
    this.flyTo(nextElement.lt)
  }

  // p-tabview - nav - content

  public moving: boolean = false;
  public flyTo(lt: [number, number]) {
    this.moving = true;
    this.map.flyTo({
      center: [
        lt[1],
        lt[0],
      ],
      essential: true,
      speed: 1.4,
      curve: 2.2,
    });
    let flag: boolean = false;
    this.map.on('moveend', () => {
      if (!flag) {
        this.moving = false;
      }
      flag = true;
    });
  }
}

import {Component, inject, model, OnInit, signal} from '@angular/core';
import {FormComponent} from './journey/form/form.component';
import {MapService} from './map.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {initializeMap, updateCarRoute} from './helper/helper-functions';

@Component({
  selector: 'app-map',
  imports: [
    FormComponent
  ],
  templateUrl: './map.component.html',
  standalone: true,
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  private mapService: MapService = inject(MapService);
  private map!: L.Map;
  private markerDictionary: { [key: string]: L.Marker } = {};
  private routePolylineDictionary: { [key: string]: L.Polyline } = {};

  startLocation = signal<[number, number]>([0, 0]);
  endLocation = signal<[number, number]>([0, 0]);
  carId = model<string>('');

  ngOnInit(): void {
    initializeMap(this.map);
    this.mapService.connect();

    this.mapService.vehicles$.subscribe((vehicles) => {
      vehicles.forEach((vehicle) => {
        const carId = vehicle.carId;
        const vehicleLocation: [number, number] = [vehicle.latitude, vehicle.longitude];
        updateCarRoute(vehicleLocation, carId, this.markerDictionary, this.map);
      });
    });
  }


}

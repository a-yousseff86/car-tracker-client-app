import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {MapProvider} from './map.provider';
import {ICar} from './model/car.interface';
import {IPosition} from './model/position.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  // BehaviorSubject to hold the current vehicles array
  vehiclesSubject = new BehaviorSubject<Array<{ carId: string; latitude: number; longitude: number }>>([]);
  // Observable for components to subscribe to for vehicles array
  vehicles$ = this.vehiclesSubject.asObservable();
  private mapProvider = inject(MapProvider);

  // Subject to emit WebSocket updates
  private carPositionSubject = new Subject<{ carId: string; latitude: number; longitude: number }>();

  // Observable that components can subscribe to
  carPositionUpdates$ = this.carPositionSubject.asObservable();

  connect(): void {
    console.log('Connecting to WebSocket');
    this.mapProvider.connect('ws://localhost:8030/ws').subscribe(
      (message: any) => {
        const parsedMessage: ICar = typeof message === 'string' ? JSON.parse(message) : message;
          parsedMessage.positions.forEach((position: IPosition) => {
            const { carId, latitude, longitude } = position;
            this.carPositionSubject.next({ carId, latitude, longitude });
            this.updateVehiclePosition(carId, latitude, longitude);
          });
      },
      error => console.error('WebSocket error:', error)
    );
  }

  private updateVehiclePosition(carId: string, latitude: number, longitude: number): void {
    const vehicles = this.vehiclesSubject.value;
    const vehicleIndex = vehicles.findIndex(vehicle => vehicle.carId === carId);
    if (vehicleIndex !== -1) {
      vehicles[vehicleIndex] = { carId, latitude, longitude };
    } else {
      vehicles.push({ carId, latitude, longitude });
    }
    this.vehiclesSubject.next([...vehicles]);
  }
}

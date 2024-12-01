import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {inject, Injectable, signal} from '@angular/core';
import {GeocodingService} from '../geocoding.service';
import {JourneyProvider} from './journey.provider';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  startLocation = signal<[number, number]>([0, 0]);
  endLocation = signal<[number, number]>([0, 0]);
  private journeyProvider = inject(JourneyProvider);
  private GeocodingService = inject(GeocodingService);


  sendJourney(journey: any): void {
    this.journeyProvider.sendJourney(journey).subscribe();
  }

  // Updated to return an observable
  public lookupCoordinates(location: string): Observable<string> {
    return this.GeocodingService.gecodeAddress(location).pipe(
      map((result:any) => {
        if (result.length > 0) {
          return result;
        }
        return [];
      }),
    );
  }
}

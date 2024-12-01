import * as L from 'leaflet';
import {DivIcon} from 'leaflet';
import 'leaflet-routing-machine';

export function smoothMarker(marker: L.Marker, waypoints: L.LatLng[]): void {
  const speed = 0.00005; // Adjust the speed of the marker
  let index = 0;

  const move = (): void => {
    if (index >= waypoints.length - 1) {
      return; // Stop when all waypoints are covered
    }

    const startLatLng = waypoints[index];
    const endLatLng = waypoints[index + 1];

    const distance = startLatLng.distanceTo(endLatLng); // Get the distance between points
    const duration = distance / speed;

    let progress = 0;
    const animate = (time: number): void => {
      progress += time;
      const factor = Math.min(progress / duration, 1); // Progress between 0 and 1
      const lat = startLatLng.lat + factor * (endLatLng.lat - startLatLng.lat);
      const lng = startLatLng.lng + factor * (endLatLng.lng - startLatLng.lng);

      marker.setLatLng([lat, lng]);

      if (factor < 1) {
        requestAnimationFrame(animate);
      } else {
        index++;
        move(); // Move to the next waypoint
      }
    };

    requestAnimationFrame(animate);
  };

  move();
}

export function addCarMarker(location: [number, number], carId: string, map: L.Map, carIcon: DivIcon | null, markerDictionary: {
  [key: string]: L.Marker
}): void {
  markerDictionary[carId] = L.marker([location[0], location[1]], {icon: carIcon!}).addTo(map);
}

// map initialization
export function initializeMap(map: L.Map): void {
  const defaultLatLng: [number, number] = [31.2001, 29.9187];
  map = L.map('map').setView(defaultLatLng, 18);
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'}).addTo(map);
}

// Update or add car marker on the map
export function updateCarMarker(location: [number, number], carId: string, markerDictionary: { [key: string]: L.Marker }, map: L.Map): void {
  if (markerDictionary[carId]) {
    // If marker exists, update its position with animation (move smoothly)
    smoothMarker(markerDictionary[carId], [
      markerDictionary[carId].getLatLng(),
      L.latLng(location[0], location[1])
    ]);
  } else {
    addCarMarker(location, carId, map, null, markerDictionary);
  }
}

// update car route on the map
export function updateCarRoute(location: [number, number], carId: string, markerDictionary: {
  [key: string]: L.Marker
}, map: L.Map): void {
  updateCarMarker(location, carId, markerDictionary, map);

    const marker = markerDictionary[carId];
    if (marker) {
      const currentLatLng: [number, number] = [marker.getLatLng().lat, marker.getLatLng().lng];
        updateRouteOnMap(currentLatLng, location, carId, map, {});
    }
}

function updateRouteOnMap(startLocation: [number, number], endLocation: [number, number], carId: string, map: L.Map, routePolyline: { [key: string]: L.Polyline }): void {
  const routeColor = getRouteColor(carId);
  const route = (L as any).Routing.control({
    waypoints: [
      L.latLng(startLocation[0], startLocation[1]),
      L.latLng(endLocation[0], endLocation[1])
    ],
    lineOptions: {
      styles: [{color: routeColor, opacity: 0.8, weight: 5}]
    },
    createMarker: () => null,
  });
    route.on('routesfound', (e: any) => {
      const waypoints = e.routes[0].coordinates;
      if (routePolyline[carId]) {
        routePolyline[carId].setLatLngs(waypoints);
      }else {
        routePolyline[carId] = L.polyline(waypoints, {color: routeColor}).addTo(map);
      }
    });
    route.addTo(map);
}

function getRouteColor(carId: string): string {
const  carColorMap: { [key: string]: string } = { '1': 'blue', '2': 'red', '3': 'green' };
    return carColorMap.hasOwnProperty(carId) ? carColorMap[carId] : 'blue';
}

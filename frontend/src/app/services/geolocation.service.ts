import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { GeoPosition, ReverseGeocodeResult } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getCurrentPosition(): Observable<GeoPosition> {
    return from(new Promise<GeoPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Géolocalisation non supportée'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }),
        (err) => reject(new Error('Erreur de géolocalisation : ' + err.message)),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }));
  }

  reverseGeocode(lat: number, lon: number): Observable<ReverseGeocodeResult> {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=fr`;
    return this.http.get<any>(url);
  }
}

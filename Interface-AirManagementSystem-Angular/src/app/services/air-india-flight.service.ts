import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';

@Injectable({ providedIn: 'root'})

export class AirIndiaFlightService {

  // private http: HttpClient = inject(HttpClient);
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/ams';
  
  getFligthList(): Observable<Flight[]>{
    const flightsURL: string = `${this.apiUrl}/flights`
    return this.http.get<Flight[]>(flightsURL);
  }
}

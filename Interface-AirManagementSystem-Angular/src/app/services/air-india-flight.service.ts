import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Flight } from '../models/flight';
import { Passenger } from '../models/passenger';
import { FlightReservation } from '../models/flightReservation';
import { FlightCancel } from '../models/flightCancel';

@Injectable({ providedIn: 'root'})
export class AirIndiaFlightService {

  constructor(private http: HttpClient) {}
  private apiUrl = '/ams';
  
  getFligthList(): Observable<Flight[]>{
    const flightsURL: string = `${this.apiUrl}/flights`
    return this.http.get<Flight[]>(flightsURL);
  }

  createPassenger(passenger: Passenger): Observable<string>{
    const createPassengerURL: string = `${this.apiUrl}/passenger/creation`;

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post<string>(createPassengerURL, passenger, { headers, responseType: 'text' as 'json' });
  }

  bookFlight(flightReservation: FlightReservation): Observable<any>{
    const flightReservationURL: string = `${this.apiUrl}/passenger/reservation`;

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    
    return this.http.post(flightReservationURL, flightReservation, { headers, responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (error) {
          return response;
        }
      })
    );
  }

  flightInfo(pnr: string): Observable<any>{
    const flightInfoURL: string = `${this.apiUrl}/passenger/journey-details`;
    
    const params = new HttpParams()
      .set('PNR', pnr);

    return this.http.get(flightInfoURL, {params, responseType: 'text'}).pipe(
      map(response => {
        try{
          return JSON.parse(response);
        }catch(error){
          return response;
        }
      })
    );
  }

  cancelFlight(flightCancel: FlightCancel): Observable<any>{
    const cancelFlightURL: string = `${this.apiUrl}/passenger/cancel`;

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.delete(cancelFlightURL, {headers, body:flightCancel, responseType:'text'}).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (error) {
          return response;
        }
      })
    );
  }
}

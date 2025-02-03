import { Component, inject, OnInit } from '@angular/core';
import { Flight } from '../../models/flight';
import { AirIndiaFlightService } from '../../services/air-india-flight.service';

@Component({
  selector: 'app-flight-list',
  imports: [],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent {

  fligths: Flight[] = [];

  test: any[] = [];

  // private airIndiaFlightService = inject(AirIndiaFlightService);

  constructor(private airIndiaFlightService: AirIndiaFlightService){}
  

  // getFlightList(){
  //   this.airIndiaFlightService.getFligthList().subscribe((res: any) => {
  //     this.test = res;
  //   })
  // };

  getFlightList(){
    this.airIndiaFlightService.getFligthList().subscribe({
      next: (data) => this.test= data,
      error: (err) => console.error ('Error obteniendo vuelos: ', err)
    });
  }

}

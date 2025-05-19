import { Component, inject, OnInit } from '@angular/core';
import { Flight } from '../../models/flight';
import { AirIndiaFlightService } from '../../services/air-india-flight.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  imports: [CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent implements OnInit{

  fligths: Flight[] = [];

  constructor(private airIndiaFlightService: AirIndiaFlightService){}
  ngOnInit(): void {
    this.getFlightList();
  }
  
  getFlightList(){
    this.airIndiaFlightService.getFligthList().subscribe({
      next: (data) => this.fligths= data,
      error: (err) => console.error ('Error getting flights: ', err)
    });
  }

}

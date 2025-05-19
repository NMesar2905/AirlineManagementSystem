import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AirIndiaFlightService } from '../../services/air-india-flight.service';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../routes.constants';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-shared-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './shared-form.component.html',
  styleUrl: './shared-form.component.css'
})
export class SharedFormComponent implements OnInit{

  ROUTES = ROUTES;

  @Input() formType: 'newPassenger' | 'flightReservation' | 'reservationInfo' | 'cancelReservation' = 'newPassenger';

  form: FormGroup = new FormGroup({});
  formSubmitted = false;
  responseMessage: string = '';
  errorMessage: string = '';
  reservationInfo: any = null;
  cancelationInfo: any = null;
  flights: Flight[] = [];
  destinations = new Set();
  sources = new Set();

  constructor(private fb: FormBuilder, private airIndiaFlightService: AirIndiaFlightService){}

  ngOnInit(): void{
    this.createForm();    
    this.populateSourcesAndDestinations();
  }

  private populateSourcesAndDestinations(): void{
    this.airIndiaFlightService.getFligthList().subscribe({
      next : (response) => {this.flights = response
        this.flights.forEach(flight => {
          this.destinations.add(flight.destination);
          this.sources.add(flight.source);
        })
      },
      error: (error) => console.error ('Error getting flights: ', error)
    });
  }

  createForm(){
    switch (this.formType){
      case 'newPassenger':
        this.form = this.fb.group({
          name: ['', Validators.required],
          nationality: ['', Validators.required],
          phone: ['', Validators.required],
          address: ['', Validators.required],
          aadhar: [,Validators.required],
          gender: ['', Validators.required]
        });
        break;
      
      case 'flightReservation':
        this.form = this.fb.group({
          aadhar: ['', Validators.required],
          src: ['', Validators.required],
          des: ['', Validators.required],
          ddate: ['', Validators.required]
        });
        break;
      
      case 'reservationInfo':
        this.form = this.fb.group({
          pnr: ['', Validators.required]
        });
        break;

      case 'cancelReservation':
        this.form = this.fb.group({
          pnr: ['', Validators.required]
        });
        break;

    }
  }

  submitForm(){
    
      if(!this.form.valid){
        console.log('Invalid Form');
        return;
      }

      switch (this.formType){
        case 'newPassenger':
          this.airIndiaFlightService.createPassenger(this.form.value).subscribe({
            next: (response) => {
              console.log('Form sent: ', response);
              this.responseMessage =   response;
              this.formSubmitted = true;
              this.form.reset();
            },
            error: (error) => {
              console.error('Error sending data', error);
              if(error.error){
                this.errorMessage = error.error;
              }else{
                this.errorMessage = 'There was an error creating the passenger. Please try again';
              }
              this.formSubmitted = true;
              this.form.reset();
            }
          });
          break;

        case 'flightReservation':
          this.airIndiaFlightService.bookFlight(this.form.value).subscribe({
            next: (response) => {
              console.log('Form sent: ', response);
              this.errorMessage = '';
              if (typeof response === 'string'){
                this.responseMessage =   response;
              }else{
                this.reservationInfo = response;
                this.responseMessage = `Flight booked successfully! Reservation PNR: ${this.reservationInfo.pnr}`;
              }
              
              this.formSubmitted = true;
              this.form.reset();
            },
            error: (error) => {
              console.error('Error sending data', error);
              if(error.error){
                this.errorMessage = error.error;
              }else{
                this.errorMessage = 'There was an error booking the flight. Please try again.';
              }
              this.formSubmitted = true;
              this.form.reset();
            }
          });
          break;
      
        case 'reservationInfo':
          this.responseMessage = '';
          this.errorMessage = '';
          this.reservationInfo = null;
          this.airIndiaFlightService.flightInfo(this.form.value.pnr).subscribe({
            next: (response) => {
              console.log('Form sent: ', response);
              if (typeof response === 'string'){
                this.responseMessage =   response;
              }else{
                this.responseMessage = 'Here is the information of your Journey'
                this.reservationInfo =   response;
              }

              this.formSubmitted = true;
              this.form.reset();
            },
            error: (error) => {
              console.error('Error sending data', error);
              this.responseMessage = ''
              if(error.error){
                this.errorMessage = error.error;
              }else{
                this.errorMessage = 'There was an error getting the information of your reservation. Please try again.';
              }
              this.formSubmitted = true;
              this.form.reset();
            }
          });
          break;
        case 'cancelReservation':
          this.airIndiaFlightService.cancelFlight(this.form.value).subscribe({
              next: (response) =>{
                console.log("Form sent ", response);
                this.errorMessage='';
                if(response === 'string'){
                  this.responseMessage = response;
                }else{
                  this.responseMessage = 'Here is your cancellation information';
                  this.cancelationInfo = response;
                }
                this.formSubmitted = true;
                this.form.reset();
              },
              error: (error) => {
                console.error('Error sending data', error);
                if(error.error){
                  this.errorMessage = error.error;
                }else{
                  this.errorMessage = 'There was a problem canceling your flight.';
                }
                this.formSubmitted = true;
                this.form.reset();
              }
          });
          break;
        }    
  }
}

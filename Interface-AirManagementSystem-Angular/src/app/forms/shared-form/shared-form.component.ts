import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AirIndiaFlightService } from '../../services/air-india-flight.service';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../routes.constants';

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
  
  constructor(private fb: FormBuilder, private airIndiaFlightService: AirIndiaFlightService){}

  ngOnInit(): void{
    this.createForm();
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
                this.errorMessage = 'There was an error booking the flight. Please try again';
              }
              this.formSubmitted = true;
              this.form.reset();
            }
          });
          break;
      }
    
  }
}

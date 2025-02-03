import { Routes } from '@angular/router';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { PassengerCreationComponent } from './components/passenger-creation/passenger-creation.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch:'full'},
    { path: 'home', component: HomeComponent},
    { path: 'flight-list', component: FlightListComponent},
    { path: 'passenger-creation', component: PassengerCreationComponent},
    { path: 'book-flight', component: BookFlightComponent},
    { path: '**', redirectTo: 'home'},

];

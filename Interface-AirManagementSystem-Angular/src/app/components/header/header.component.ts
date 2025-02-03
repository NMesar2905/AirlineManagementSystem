import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../routes.constants';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  ROUTES = ROUTES;
}

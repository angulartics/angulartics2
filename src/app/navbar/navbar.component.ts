import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    svg {
      width: 1.1rem !important;
      max-height: 1.1rem !important;
      vertical-align: text-top !important;
    }
  `],
})
export class NavbarComponent {
  navbarCollapsed = true;
}

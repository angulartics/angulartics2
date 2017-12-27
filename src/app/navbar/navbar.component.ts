import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .mat-icon {
      width: 1.1rem !important;
      max-height: 1.1rem !important;
      vertical-align: text-top !important;
    }
  `],
})
export class NavbarComponent {
  navbarCollapsed = true;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl(
        `assets/svg/github.svg`,
      ),
    );
  }
}

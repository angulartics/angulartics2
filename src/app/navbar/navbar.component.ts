import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-expand-md navbar-dark bg-blue">
    <div class="container">
      <a class="navbar-brand" href="#">Angulartics2</a>
      <button class="navbar-toggler" type="button"
        (click)="navbarCollapsed = !navbarCollapsed"
        [attr.aria-expanded]="!navbarCollapsed" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse" id="navbarSupportedContent" [ngbCollapse]="navbarCollapsed">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown" ngbDropdown>
            <a class="nav-link dropdown-toggle" id="navbarDropdown" ngbDropdownToggle>
              Providers
            </a>
            <div class="dropdown-menu" ngbDropdownMenu aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link p-2" href="https://github.com/angulartics/angulartics2" target="_blank" rel="noopener" aria-label="GitHub">
              <app-github></app-github>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  styles: [`
  svg {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: text-top;
  }
  `],
})
export class NavbarComponent implements OnInit {
  navbarCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}

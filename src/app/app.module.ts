import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubComponent } from './github/github.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GithubComponent,
  ],
  imports: [
    BrowserModule,

    NgbDropdownModule.forRoot(),
    NgbCollapseModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';

const importModule = `import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@NgModule({
  imports: [
    // added to imports
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
})
`;

const importComponent = `import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'app',
  template: \`your template\`
})
export class AppComponent {
  // initializes the service and starts event subscriptions
  constructor(googleAnalytics: Angulartics2GoogleAnalytics) {}
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  importModule = importModule;
  importComponent = importComponent;
}

import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  Angulartics2,
  Angulartics2OnModule,
  Angulartics2Settings,
  ANGULARTICS2_TOKEN,
  RouterlessTracking,
} from 'angulartics2';
import { UIRouterTracking } from './uirouter';

@NgModule({
  imports: [Angulartics2OnModule],
})
export class Angulartics2UirouterModule {
  static forRoot(
    settings: Partial<Angulartics2Settings> = {},
  ): ModuleWithProviders<Angulartics2UirouterModule> {
    return {
      ngModule: Angulartics2UirouterModule,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
        { provide: RouterlessTracking, useClass: UIRouterTracking },
        Angulartics2,
      ],
    };
  }
}

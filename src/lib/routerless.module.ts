import { ModuleWithProviders, NgModule } from '@angular/core';

import {ANGULARTICS2_TOKEN} from './angulartics2-token';
import {Angulartics2Settings} from './angulartics2-config';
import {Angulartics2OnModule} from './angulartics2On';
import {Angulartics2} from './angulartics2-core';
import {RouterlessTracking} from './routerless';

@NgModule({
  imports: [Angulartics2OnModule],
})
export class Angulartics2RouterlessModule {
  static forRoot(
    settings: Partial<Angulartics2Settings> = {}
  ): ModuleWithProviders<Angulartics2RouterlessModule> {
    return {
      ngModule: Angulartics2RouterlessModule,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
        RouterlessTracking,
        Angulartics2,
      ],
    };
  }
}

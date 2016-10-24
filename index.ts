import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { Angulartics2 } from './src/core/angulartics2';
import { Angulartics2On } from './src/core/angulartics2On';

export * from './src/core/angulartics2';
export * from './src/core/angulartics2On';
export * from './src/providers'

export default {
  providers: [ Angulartics2 ]
};

@NgModule({
  declarations: [ Angulartics2On ],
  exports: [ Angulartics2On ]
})
export class Angulartics2Module {
  constructor(@Optional() @SkipSelf() parentModule: Angulartics2Module) {
    if (parentModule) {
      throw new Error('Angulartics2Module already loaded; Import in root module only.');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Angulartics2Module,
      providers: [ Angulartics2 ]
    };
  }
}

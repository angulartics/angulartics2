import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { Angulartics2 } from './core/angulartics2';
import { Angulartics2On } from './core/angulartics2On';

export * from './core/angulartics2';
export * from './core/angulartics2On';
export * from './providers/index'

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

import { provide, Component, ComponentResolver, Injector } from '@angular/core';
import {
  Router,
  RouterConfig,
  RouterOutletMap,
  UrlSerializer,
  DefaultUrlSerializer,
  ROUTER_DIRECTIVES
} from '@angular/router';
import { Location } from '@angular/common';
import { tick } from '@angular/core/testing';
import { SpyLocation } from '@angular/common/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';

@Component({ selector: 'hello-cmp', template: `{{greeting}}` })
export class HelloCmp {
  greeting: string;
  constructor() { this.greeting = 'hello'; }
}

@Component({ selector: 'hello-cmp2', template: `<div>2</div>` })
export class HelloCmp2 {
}

@Component({ selector: 'hello-cmp3', template: `<div>3</div>` })
export class HelloCmp3 {
}

@Component({ selector: 'hello-cmp4', template: `<div>4</div>` })
export class HelloCmp4 {
}

@Component({ selector: 'hello-cmp5', template: `<div>5</div>` })
export class HelloCmp5 {
}

const config: RouterConfig = [
  { path: '/', component: HelloCmp },
  { path: '/abc', component: HelloCmp2 },
  { path: '/def', component: HelloCmp3 },
  { path: '/ghi', component: HelloCmp4 },
  { path: '/sections/123/pages/456', component: HelloCmp5 }
]

@Component({
  selector: 'root-comp',
  template: `<router-outlet></router-outlet>`
})
export class RootCmp {
  name: string;
}

export const TEST_ROUTER_PROVIDERS: any[] = [
  RouterOutletMap,
  { provide: UrlSerializer, useClass: DefaultUrlSerializer },
  { provide: Location, useClass: SpyLocation },
  {
    provide: Router,
    useFactory: (resolver: ComponentResolver, urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, injector: Injector) => {
      const r = new Router(RootCmp, resolver, urlSerializer, outletMap, location, injector, config);
      r.initialNavigation();
      return r;
    },
    deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
  },
];

export function compile(tcb: TestComponentBuilder): Promise<ComponentFixture<any>> {
  return tcb.createAsync(RootCmp);
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

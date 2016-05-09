import {provide, Component, ComponentResolver} from '@angular/core';
import {
  Router,
  RouterOutletMap,
  RouteSegment,
  Route,
  ROUTER_DIRECTIVES,
  Routes,
  RouterUrlSerializer,
  DefaultRouterUrlSerializer,
  OnActivate,
  CanDeactivate
} from '@angular/router';
import {Location} from '@angular/common';
import {tick} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';
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

@Component({
  selector: 'root-comp',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  new Route({ path: '/', component: HelloCmp }),
  new Route({ path: '/abc', component: HelloCmp2 }),
  new Route({ path: '/def', component: HelloCmp3 }),
  new Route({ path: '/ghi', component: HelloCmp4 }),
  new Route({ path: '/sections/123/pages/456', component: HelloCmp5 })
 ])
export class RootCmp {
  name: string;
}

export const TEST_ROUTER_PROVIDERS: any[] = [
  provide(RouterUrlSerializer, {useClass: DefaultRouterUrlSerializer}),
  RouterOutletMap,
  provide(Location, { useClass: SpyLocation }),
  provide(Router, {
    useFactory: (componentResolver: ComponentResolver, urlSerializer: RouterUrlSerializer,
                       routerOutletMap: RouterOutletMap, location: Location) => {
      new Router("RootCmp", RootCmp, componentResolver, urlSerializer, routerOutletMap, location)
    },
    deps: [ComponentResolver, RouterUrlSerializer, RouterOutletMap, Location]
  })
];

export function compile(tcb: TestComponentBuilder): Promise<ComponentFixture<any>> {
  return tcb.createAsync(RootCmp);
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

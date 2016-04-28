import {ApplicationRef, provide, Component} from 'angular2/core';
import {ROUTER_PRIMARY_COMPONENT, ROUTER_DIRECTIVES, RouteRegistry, Router} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {RootRouter} from 'angular2/src/router/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {TestComponentBuilder, ComponentFixture} from 'angular2/testing';

@Component({
  selector: 'test',
  template: '<div></div>'
})
class MockPrimaryComponent { }

@Component({
  selector: 'root-comp',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
export class RootCmp {
  name: string;
}

@Component({ selector: 'hello-cmp', template: `{{greeting}}` })
export class HelloCmp {
  greeting: string;
  constructor() { this.greeting = 'hello'; }
}

export function compile(tcb: TestComponentBuilder): Promise<ComponentFixture> {
  return tcb.createAsync(RootCmp);
}

export const TEST_ROUTER_PROVIDERS: any[] = [
  RouteRegistry,
  provide(Location, { useClass: SpyLocation }),
  provide(ROUTER_PRIMARY_COMPONENT, { useValue: MockPrimaryComponent }),
  provide(Router, { useClass: RootRouter })
];
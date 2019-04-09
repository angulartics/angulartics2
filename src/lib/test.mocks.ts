import { CommonModule } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';
import { tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UIRouterModule } from '@uirouter/angular';

import { Angulartics2, Angulartics2Module } from 'angulartics2';

@Injectable({ providedIn: 'root' })
export class DummyProvider {
  eventSpy: any;
  constructor(angulartics2: Angulartics2) {
    this.eventSpy = jasmine.createSpy('eventSpy');
    angulartics2.pageTrack.subscribe((x) => this.eventSpy(x));
  }
}

@Component({ selector: 'hello-cmp', template: `{{ greeting }}` })
export class HelloCmp {
  greeting: string;
  constructor() {
    this.greeting = 'hello';
  }
}

@Component({ selector: 'hello-cmp2', template: `<div>2</div>` })
export class HelloCmp2 {}

@Component({ selector: 'hello-cmp3', template: `<div>3</div>` })
export class HelloCmp3 {}

@Component({ selector: 'hello-cmp4', template: `<div>4</div>` })
export class HelloCmp4 {}

@Component({ selector: 'hello-cmp5', template: `<div>5</div>` })
export class HelloCmp5 {}

export const RoutesConfig: Routes = [
  { path: '', component: HelloCmp },
  { path: 'abc', component: HelloCmp2 },
  { path: 'def', component: HelloCmp3 },
  { path: 'ghi', component: HelloCmp4 },
  { path: 'sections/123/pages/456', component: HelloCmp5 },
  { path: 'sections/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages/456', component: HelloCmp5 },
  { path: '0sections0/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages', component: HelloCmp5 },
  { path: '0sections0/a01/pages/page/2/summary', component: HelloCmp5 },
];

@Component({
  selector: 'root-comp',
  template: `<router-outlet></router-outlet>`,
})
export class RootCmp {
  constructor(dummy: DummyProvider) {}
}

@Component({
  selector: 'root-dummy-comp',
  template: `hello`,
})
export class RouterlessRootCmp {
  constructor(dummy: DummyProvider) {}
}

@Component({
  selector: 'root-comp',
  template: `<ui-view></ui-view>`,
})
export class UIRootCmp {
  constructor(dummy: DummyProvider) {}
}

export const UIRoutesConfig = [
  { name: 'home', component: HelloCmp, url: '/home' },
  { name: 'def', component: HelloCmp2, url: '/' },
];

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

export function createRoot(type: any): ComponentFixture<any> {
  const f = TestBed.createComponent(type);
  advance(f);
  return f;
}

export function createRootWithRouter(
  router: Router,
  type: any,
): ComponentFixture<any> {
  const f = TestBed.createComponent(type);
  advance(f);
  router.initialNavigation();
  advance(f);
  return f;
}

@NgModule({
  declarations: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RouterlessRootCmp,
  ],
}) export class HelloModule {}

@NgModule({
  imports: [
    HelloModule,
    CommonModule,
    UIRouterModule.forRoot({
      states: UIRoutesConfig,
      useHash: true,
      otherwise: { state: 'home' },
    }),
    Angulartics2Module.forRoot(),
  ],
  entryComponents: [UIRootCmp],
  declarations: [
    UIRootCmp,
  ],
})
export class UITestModule {
}

@NgModule({
  imports: [
    HelloModule,
    CommonModule,
    RouterTestingModule,
    Angulartics2Module.forRoot(),
  ],
  entryComponents: [RootCmp],
  declarations: [
    RootCmp,
  ],
})
export class TestModule {
}

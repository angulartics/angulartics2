import { Component, NgModule } from '@angular/core';
import {
  Routes,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { TestBed, tick, ComponentFixture } from '@angular/core/testing';

import { Angulartics2Module } from '../';

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

export const RoutesConfig: Routes = [
  { path: '', component: HelloCmp },
  { path: 'abc', component: HelloCmp2 },
  { path: 'def', component: HelloCmp3 },
  { path: 'ghi', component: HelloCmp4 },
  { path: 'sections/123/pages/456', component: HelloCmp5 }
];

@Component({
  selector: 'root-comp',
  template: `<router-outlet></router-outlet>`
})
export class RootCmp {
  name: string;
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

export function createRoot(type: any): ComponentFixture<any> {
  const f = TestBed.createComponent(type);
  advance(f);
  return f;
}

export function createRootWithRouter(router: Router, type: any): ComponentFixture<any> {
  const f = TestBed.createComponent(type);
  advance(f);
  router.initialNavigation();
  advance(f);
  return f;
}

@NgModule({
  imports: [
    CommonModule,
    RouterTestingModule,
    Angulartics2Module.forRoot()
  ],
  entryComponents: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RootCmp
  ],

  exports: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RootCmp
  ],

  declarations: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RootCmp
  ]
})
export class TestModule {
}

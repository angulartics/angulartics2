import { CommonModule } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Angulartics2Module } from 'angulartics2';

@Injectable()
export class DummyProvider {
  constructor() {}
}

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
  { path: 'sections/123/pages/456', component: HelloCmp5 },
  { path: 'sections/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages/456', component: HelloCmp5 },
  { path: '0sections0/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages', component: HelloCmp5 },
  { path: '0sections0/a01/pages/page/2/summary', component: HelloCmp5 },
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
    Angulartics2Module.forRoot([ DummyProvider ])
  ],
  entryComponents: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RootCmp,
  ],
  exports: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RootCmp,
  ],
  declarations: [
    HelloCmp,
    HelloCmp2,
    HelloCmp3,
    HelloCmp4,
    HelloCmp5,
    RootCmp,
  ]
})
export class TestModule {
}

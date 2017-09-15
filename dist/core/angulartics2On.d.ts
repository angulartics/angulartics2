import { ElementRef, AfterContentInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Angulartics2 } from './angulartics2';
export declare class Angulartics2On implements AfterContentInit {
    private elRef;
    private angulartics2;
    private eventManager;
    angulartics2On: string;
    angularticsEvent: string;
    angularticsCategory: string;
    angularticsProperties: any;
    private el;
    constructor(elRef: ElementRef, angulartics2: Angulartics2, eventManager: EventManager);
    ngAfterContentInit(): void;
    isBrowser(): boolean;
    eventTrack(event: any): void;
}

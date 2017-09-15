import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from '../../core/angulartics2';

declare var clicky: any;
declare var window: any;

@Injectable()
export class Angulartics2Clicky {
    
    constructor(
        private angulartics2: Angulartics2,
        private titleService: Title
    ) {
        if( typeof (clicky) === 'undefined' ) {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
        this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));
        this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));
    }

    pageTrack (path:string): void {
        let title: string = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    }

    eventTrack (action:string, properties:any): void {
        if( typeof (properties.goal) === 'undefined' ) {
            let title: string = properties.title || null;
            let type: string = (properties.eventType != null)? this.validateType(properties.eventType) : null;
            clicky.log(action, title, type);
        } else {
            let goalId = properties.goal;
            let revenue = this.validateNumber(properties.revenue) ? properties.revenue : null;
            let noQueue = !!properties.noQueue;
            clicky.goal(goalId, revenue, noQueue);
        }
    }

    validateType (type: string): string {
        const TYPE_ENUM = ['click', 'download', 'outbound', 'pageview'];
        return (TYPE_ENUM.indexOf(type) >= 0) ? type : 'pageview';
    }

    validateNumber (number: number): boolean {
        return typeof number === 'number' && isFinite(number);
      }
    
}
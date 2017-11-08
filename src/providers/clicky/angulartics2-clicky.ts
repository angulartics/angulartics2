import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from '../../core/angulartics2';
import { ClickyProperties} from './properties.model';

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
        this.angulartics2.eventTrack.subscribe((x: any) => this.eventOrGoalTrack(x.action, x.properties));
    }

    /**
     * Track Page in Clicky
     * 
     * @name pageTrack
     * 
     * @param {string} path
     * 
     * @link https://clicky.com/help/custom/manual#log
     */
    pageTrack (path: string): void {
        let title: string = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    }

    /**
     * Track Event Or Goal in Clicky
     * @name eventOrGoalTrack
     *
     * @param {string} action
     * @param {object} properties Definition of 'properties.goal' determines goal vs event tracking
     *
     * @link https://clicky.com/help/custom/manual#log
     * @link https://clicky.com/help/custom/manual#goal
     *
     */
    eventOrGoalTrack (action: string, properties: ClickyProperties): void {
        if( typeof (properties.goal) === 'undefined' ) {
            let title: string = properties.title || null;
            let type: string = (properties.type != null)? this.validateType(properties.type) : null;
            clicky.log(action, title, type);
        } else {
            let goalId: string = properties.goal;
            let revenue: number = properties.revenue;
            clicky.goal(goalId, revenue, !!properties.noQueue);
        }
    }

    private validateType(type: string): string {
        const EventType = ['pageview','click','download','outbound'];
        return (EventType.indexOf(type) > -1)? type : 'pageview';
    }
}
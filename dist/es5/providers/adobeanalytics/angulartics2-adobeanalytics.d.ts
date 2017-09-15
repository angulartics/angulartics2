import { Location } from '@angular/common';
import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2AdobeAnalytics {
    private angulartics2;
    private location;
    constructor(angulartics2: Angulartics2, location: Location);
    pageTrack(path: string): void;
    /**
     * Track Event in Adobe Analytics
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    eventTrack(action: string, properties: any): void;
    private setPageName();
    setUserProperties(properties: any): void;
}

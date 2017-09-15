import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2GoogleAnalytics {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    pageTrack(path: string): void;
    /**
     * Track Event in GA
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    eventTrack(action: string, properties: any): void;
    /**
     * Exception Track Event in GA
     * @name exceptionTrack
     *
     * @param {object} properties Comprised of the optional fields:
     *     'fatal' (string),
     *     'description' (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    exceptionTrack(properties: any): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
    /**
     * User Timings Event in GA
     * @name userTimings
     *
     * @param {object} properties Comprised of the mandatory fields:
     *     'timingCategory' (string),
     *     'timingVar' (string),
     *     'timingValue' (number)
     * Properties can also have the optional fields:
     *     'timingLabel' (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    userTimings(properties: any): void;
    private setDimensionsAndMetrics(properties);
}

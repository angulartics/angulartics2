/**
 * Properties passed through angulartics2-clicky and fed into clicky itself
 * 
 * @export
 * @interface ClickyProperties
 * 
 */
export interface ClickyProperties {
    /** Title of the page for page tracking, or name of the event for event tracking */
    title: string;
    type: EventType;
    /** The id / name of a clicky goal against which revenue can be tracked */
    goal: string;
    /** The revenue that is tracked against a given clicky goal */
    revenue: number;
    /** Whether or not to bypass the clicky queue -- tracking may not occur on pageloads if 'true'  */
    noQueue: boolean;

}

/**
 * 
 * The limited set of things that can be tracked with clicky
 * @export
 * @enum {string}
 */
export enum EventType {
    Click = 'click',
    Download = 'download',
    Outbound = 'outbound',
    Pageview = 'pageview'
}



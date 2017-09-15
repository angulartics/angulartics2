import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2Facebook {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties
     */
    eventTrack(action: string, properties: any): void;
}

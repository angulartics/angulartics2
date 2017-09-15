import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2GoogleTagManager {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    pageTrack(path: string): void;
    /**
     * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
     */
    eventTrack(action: string, properties: any): void;
    /**
     * Exception Track Event in GTM
     * @name exceptionTrack
     *
     * @param {object} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional  fields 'fatal' (boolean) and 'description' (string)
     */
    exceptionTrack(properties: any): void;
    /**
     * Set userId for use with Universal Analytics User ID feature
     * @name setUsername
     *
     * @param {string} userId Required 'userId' value (string) used to identify user cross-device in Google Analytics
     */
    setUsername(userId: string): void;
}

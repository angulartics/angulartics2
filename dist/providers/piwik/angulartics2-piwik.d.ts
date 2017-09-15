import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2Piwik {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    pageTrack(path: string, location: any): void;
    eventTrack(action: string, properties: any): void;
    setUsername(userId: string): void;
    /**
     * Sets custom dimensions if at least one property has the key "dimension<n>",
     * e.g. dimension10. If there are custom dimensions, any other property is ignored.
     *
     * If there are no custom dimensions in the given properties object, the properties
     * object is saved as a custom variable.
     *
     * If in doubt, prefer custom dimensions.
     * @see https://piwik.org/docs/custom-variables/
     */
    setUserProperties(properties: any): void;
    private setCustomDimensions(properties);
}

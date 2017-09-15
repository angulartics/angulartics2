import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2BaiduAnalytics {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    /**
     * Page Track in Baidu Analytics
     * @name pageTrack
     *
     * @param {string} path Required 'path' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
     *
     */
    pageTrack(path: string): void;
    /**
     * Track Event in Baidu Analytics
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string), 'opt_label'(string) and 'opt_value' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
     *
     */
    eventTrack(action: string, properties: any): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
}

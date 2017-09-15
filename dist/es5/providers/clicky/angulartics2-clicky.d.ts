import { Title } from '@angular/platform-browser';
import { Angulartics2 } from '../../core/angulartics2';
export declare class Angulartics2Clicky {
    private angulartics2;
    private titleService;
    constructor(angulartics2: Angulartics2, titleService: Title);
    pageTrack(path: string): void;
    eventTrack(action: string, properties: any): void;
    validateType(type: string): string;
    validateNumber(number: number): boolean;
}

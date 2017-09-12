import { Injectable } from '@angular/core';
import { Angulartics2 } from '../../core/angulartics2';

declare var clicky: any;

@Injectable()
export class Angulartics2Clicky {
    constructor(
        private angulartics2: Angulartics2
    ) {
        if( typeof (clicky) === 'undefined'){
            console.warn('Clicky not found');
        }
        this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));
    }

    pageTrack(path:string, location:any){
        clicky.log(path);
    }
    
}
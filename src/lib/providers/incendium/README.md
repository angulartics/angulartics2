<img
    src="../../../assets/svg/incendium.svg"
    alt="Incendium analytics logo"
    height="100px"
    width="200px" />

**homepage**: [incendium.ai](https://www.incendium.ai/)  
**import**: `import { Angulartics2Incendium } from 'angulartics2';`

## Setup

1. Add tracking code provided by Incendium inside the header tag.

2. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/master#installation) using `Angulartics2Incendium`

   ```typescript
   constructor(Angulartics2Incendium: Angulartics2Incendium) {
       Angulartics2Incendium.startTracking();
   }
   ```

3. Track Conversions, You can track conversions using Angulartics2 event tracking.
   this can be done by adding the following to you html

   ```html
   <button
     angulartics2On="click"
     angularticsAction="{{ eIncendiumEventNames.ADD_CONVERION }}"
     [angularticsProperties]="{ key: 'my_trigger_as_assigned_in_incendium' }"
   >
     Btn click
   </button>
   ```

   Note that eIncendiumEventNames is a reference to IncendiumEventNames expoted from Angulartics2Incendium

   Or you can fire the conversion in code for example

   ```typescript
   this.angulartics2.eventTrack.next({
     action: IncendiumEventNames.ADD_CONVERION,
     properties: {
       key: 'my_trigger_as_assigned_in_incendium',
     },
   });
   ```

4. Incendium allows for offline tracking, to do this you must record the conversion key provided when firing a conversion.
   A example of this would be a contact form which you later convert on the phone, incendium allows you to assign revenue next to this original conversion using this key

   to do this fire a conversion off as above.
   you can then subscribe to incendiumResponse. once the conversion has been tracked and response is returned you can use this response how ever you like.

   **_Dont forget to unsubscribe_**

   An Example workflow of this would be

   ```typescript
   export class Example implements OnInit {
     private incSubscription;

     constructor(
       private angulartics2: Angulartics2,
       private angulartics2Incendium: Angulartics2Incendium,
     ) {}

     ngOnInit(): void {
       this.incSubscription = this.angulartics2Incendium.incendiumResponse.subscribe({
         next: v => {
           if (v.type === IncendiumEventNames.ADD_CONVERION) {
             this.submit(v.value);
           }
         },
         error: e => {
           console.error(e);
           // submit without key or handle how you like
           this.submit();
         },
       });
     }

     ngOnDestroy(): void {
       // Dont forget to unsubscribe
       this.incSubscription.unsubscribe();
     }

     onSubmit() {
       this.angulartics2.eventTrack.next({
         action: IncendiumEventNames.ADD_CONVERION,
         properties: {
           key: 'my_trigger_as_assigned_in_incendium',
         },
       });
     }

     submit(incendiumKey?: string) {
       alert(`form submitted with ${incendiumKey ? `key ${incendiumKey}` : `no key`}`);
     }
   }
   ```

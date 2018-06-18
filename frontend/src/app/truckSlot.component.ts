import { Component, Input } from '@angular/core';
import { Slot } from './planningTruckGrid.component';
import { Release } from './planningOrderGrid.component';

@Component({
  selector: 'truckslotcomponent',
  template: `    
    {{release.release}}
  `,
  styleUrls: ['./app.component.css']
})
export class TruckSlotComponent {
  @Input() forty: boolean;
  @Input() firstForty: boolean;
  @Input() release: Release;
}

import { Component, Input } from '@angular/core';
import { Slot } from './planningTruckGrid.component';

@Component({
  selector: 'truckRoundPlanner',
  template: `
    <truckslotcomponent [release]="slot1.release" [forty]="slot1.supports40" [firstForty]="slot1.supports40" ></truckslotcomponent>
    <truckslotcomponent [release]="slot2.release" [forty]="slot2.supports40"></truckslotcomponent>
    <truckslotcomponent [release]="slot3.release" [forty]="slot3.supports40"></truckslotcomponent>
  `,
  styleUrls: ['./app.component.css']
})
export class TruckRoundPlannerComponent {

  @Input() slots: Slot[];

  slot1;
  slot2;
  slot3;

  ngOnInit()
  {
    if (this.slots)
    {
      //need to do verification for these slots
      this.slot1 = this.slots[0];
      this.slot2 = this.slots[1];
      this.slot3 = this.slots[2];
    }
  }

}

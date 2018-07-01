import { Component, Input } from '@angular/core';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';

//is this too abstract?
@Component({
  selector: 'truckRoundPlanner',
  templateUrl: './truck-round-planner.component.html',
  styleUrls: ['../app.component.css']
})
export class TruckRoundPlanner {

  @Input() slots: Slot[];

  ngOnInit()
  {
  }

}

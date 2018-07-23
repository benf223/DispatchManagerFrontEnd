import {Component, Input, OnInit} from '@angular/core';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';

//is this too abstract?
@Component({
  selector: 'truckRoundPlanner',
  templateUrl: './truck-round-planner.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckRoundPlanner implements OnInit {

  @Input() slots: Slot[];

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';

// This class should be removed as it is too abstract
@Component({
  selector: 'app-truck-round-planner',
  templateUrl: './truck-round-planner.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckRoundPlannerComponent implements OnInit {

  // Data input for two-way binding onto component
  @Input() slots: Slot[];

  ngOnInit() {
  }
}

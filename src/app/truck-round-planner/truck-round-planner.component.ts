import {Component, Input, OnInit} from '@angular/core';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';
import {DraghelperService} from "../draghelper.service";

@Component({
  selector: 'truckRoundPlanner',
  templateUrl: './truck-round-planner.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckRoundPlanner implements OnInit {

  constructor (private draghelperService : DraghelperService) {}

  @Input() slots: Slot[];

  ngOnInit() {

  }

  log(e) {
    console.log(e);
  }
}

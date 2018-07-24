import {Component, Input, OnInit} from '@angular/core';
import { Release } from '../planning-release-grid/planning-release-grid.component';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';
import {DraghelperService} from "../draghelper.service";

@Component({
  selector: 'truckslotscomponent',
  templateUrl: './truck-slots.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckSlotsComponent implements OnInit {
  @Input() slots: Slot[];
  releases: Release[];

  constructor(private draghelperService : DraghelperService) {}

  ngOnInit() {
    this.releases = new Array();

    this.releases.push(this.slots[0].release);
    this.releases.push(this.slots[1].release);
    this.releases.push(this.slots[2].release);
  }

  updateRelease(i) {
    if (this.draghelperService.getRelease()) {

      this.releases[i] = this.draghelperService.getRelease();
    }

    this.draghelperService.onReleaseEnd();
  }

  log(i) {
    console.log(this.releases[i].release);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import { Release } from '../planning-release-grid/planning-release-grid.component';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';
import {DragHelperService} from '../drag-helper.service';

@Component({
  selector: 'app-truck-slots-component',
  templateUrl: './truck-slots.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckSlotsComponent implements OnInit {

  // Input of data from parent component
  @Input() slots: Slot[];

  // Two-way binding for the component
  releases: Release[];

  // Injects the draghelper service
  constructor(private draghelperService: DragHelperService) {}

  // Initialises the two-way bound data
  ngOnInit() {
    this.releases = [];

    this.releases.push(this.slots[0].release);
    this.releases.push(this.slots[1].release);
    this.releases.push(this.slots[2].release);
  }

  // Listener from the dropzone directive
  updateRelease(i) {
    if (this.draghelperService.getRelease()) {

      this.releases[i] = this.draghelperService.getRelease();
    }

    this.draghelperService.onReleaseEnd();
  }
}

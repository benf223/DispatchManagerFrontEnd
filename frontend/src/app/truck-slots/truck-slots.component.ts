import { Component, Input } from '@angular/core';
import { Release } from '../planning-release-grid/planning-release-grid.component';
import { Slot } from '../planning-truck-grid/planning-truck-grid.component';

@Component({
  selector: 'truckslotscomponent',
  templateUrl: './truck-slots.component.html',
  styleUrls: ['../app.component.css']
})
export class TruckSlotsComponent {
  @Input() slots: Slot[];
  releases: Release[];

  ngOnInit()
  {
    this.releases = new Array();

    this.releases.push(this.slots[0].release);
    this.releases.push(this.slots[1].release);
    this.releases.push(this.slots[2].release);
  }

  log(i)
  {
    console.log(this.releases[i].release);
  }
}

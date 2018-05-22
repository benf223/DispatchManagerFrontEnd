import { Component } from '@angular/core';

@Component({
  selector: 'planning',
  template: `
    <br>
    <planningselector></planningselector>
    <mat-grid-list cols="6" rowHeight="600px">
      <mat-grid-tile colspan="2" rowspan="1">
        <planningordergrid></planningordergrid>
      </mat-grid-tile>
      <mat-grid-tile colspan="4" rowspan="1" style="background: orange">
        <planningtruckgrid></planningtruckgrid>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./app.component.css']
})
export class PlanningComponent {
}

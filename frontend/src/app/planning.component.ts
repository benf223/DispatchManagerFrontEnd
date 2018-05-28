import { Component } from '@angular/core';

@Component({
  selector: 'planning',
  template: `
    <planningselector></planningselector>
    <mat-card>
      <table width="100%">
        <tr>
          <td width="30%">
            <planningordergrid></planningordergrid>
          </td>
          <td width="70%">
            <planningtruckgrid></planningtruckgrid>
          </td>
        </tr>
      </table>
    </mat-card>
  `,
  styleUrls: ['./app.component.css']
})
export class PlanningComponent {
}

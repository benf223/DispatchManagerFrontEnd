import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'planningordergrid',
  template: `
    <mat-form-field style="background-color: white; width: 100%;">
      <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Release Number">
    </mat-form-field>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" style="min-width: 100%">
      <ng-container matColumnDef="release">
        <th mat-header-cell *matHeaderCellDef >Release Number</th>
        <td mat-cell *matCellDef="let release">{{release.release}}</td>
      </ng-container>
      <ng-container matColumnDef="qty">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Quantity</th>
        <td mat-cell *matCellDef="let release">{{release.qty}}</td>
      </ng-container>
      <ng-container matColumnDef="size">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Container Size</th>
        <td mat-cell *matCellDef="let release">{{release.size}}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styleUrls: ['./app.component.css']
})
export class PlanningOrderGridComponent {
  displayedColumns = ['release', 'qty', 'size'];
  dataSource = new MatTableDataSource(SAMPLE_RELEASES);

  ngOnInit()
  {
    this.dataSource.filterPredicate = (data: Release, filter : string) => (data.release.indexOf(filter) != -1);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

export interface Release {
  release: string;
  size: number;
  qty: number;
}

const SAMPLE_RELEASES: Release[] = [
  {release: '1', qty: 2, size: 40},
  {release: '2', qty: 4, size: 20},
  {release: '3', qty: 1, size: 40},
  {release: '4', qty: 5, size: 20},
  {release: '4', qty: 5, size: 20},
  {release: '4', qty: 5, size: 20},
  {release: '4', qty: 5, size: 20},
  {release: '4', qty: 5, size: 20},
  {release: '4', qty: 5, size: 20}
];

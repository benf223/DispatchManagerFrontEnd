import {Component, ViewChild} from '@angular/core';
import {Release} from './planningOrderGrid.component';
import {MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'planningtruckgrid',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z5" style="min-width: 100%;">
      <ng-container matColumnDef="truckID">
        <th mat-header-cell *matHeaderCellDef>Truck ID</th>
        <td mat-cell *matCellDef="let truck">
          {{truck.id}}
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound1">
        <th mat-header-cell *matHeaderCellDef>Round 1</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[0].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[0].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound2">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 2</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[1].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[1].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound3">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 3</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[2].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[2].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound4">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 4</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[3].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[3].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound5">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 5</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[4].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[4].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound6">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 6</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[5].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[5].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound7">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 7</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[6].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[6].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <ng-container matColumnDef="dayRound8">
        <th mat-header-cell *matHeaderCellDef style="min-width: 30%">Round 8</th>
        <td mat-cell *matCellDef="let truck">
          <truckRoundPlanner *ngIf="day" [slots]="truck.dayRounds[7].slots"></truckRoundPlanner>
          <truckRoundPlanner *ngIf="!day" [slots]="truck.nightRounds[7].slots"></truckRoundPlanner>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <mat-paginator class="mat-elevation-z5" [pageSizeOptions]="[10]" showFirstLastButtons></mat-paginator>
    <br>
    <button mat-raised-button color="primary" (click)="updateTable()" id="button">{{dayOrNight}}</button>
  `,
  styleUrls: ['./app.component.css']
})
export class PlanningTruckGridComponent
{
  displayedColumns = ['truckID', 'dayRound1', 'dayRound2', 'dayRound3', 'dayRound4', 'dayRound5', 'dayRound6', 'dayRound7', 'dayRound8'];
  dataSource = new MatTableDataSource(TRUCKS);
  day = true;
  dayOrNight = 'Switch to: Night';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit()
  {
    this.dataSource.paginator = this.paginator;
  }

  updateTable()
  {
    if (this.day)
    {
      this.dayOrNight = 'Switch to: Day';
    }
    else
    {
      this.dayOrNight = 'Switch to: Night';
    }

    this.day = !this.day;
  }
}

export interface Slot
{
  supports40: boolean;
  release: Release;
}

export interface Rounds
{
  roundNumber: number;
  slots: Slot[];
}

export interface Truck
{
  id: string;
  dayRounds: Rounds[];
  nightRounds: Rounds[];
}

//this is the data from the server
const TRUCKS: Truck[] = [
  {
    id: 'truck1', dayRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testday1a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday1b', size: 1, qty: 1}}, {
              supports40: false,
              release: {release: 'testday1c', size: 1, qty: 1}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testday2a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday2b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday2c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testday3a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday3b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday3c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testday4a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday4b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday4c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testday5a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday5b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday5c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testday6a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday6b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday6c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday7a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday7b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday7c', size: 1, qty: 1}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday8a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday8b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday8c', size: 1, qty: 1}}
            ]
        }
      ],
    nightRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testnight1a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight1b', size: 1, qty: 1}}, {
              supports40: false,
              release: {release: 'testnight1c', size: 1, qty: 1}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testnight2a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight2b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight2c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testnight3a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight3b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight3c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testnight4a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight4b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight4c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testnight5a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight5b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight5c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testnight6a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight6b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight6c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight7a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight7b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight7c', size: 1, qty: 1}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight8a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight8b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight8c', size: 1, qty: 1}}
            ]
        }
      ]
  },
  {
    id: 'truck2', dayRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testday1a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday1b', size: 1, qty: 1}}, {
              supports40: false,
              release: {release: 'testday1c', size: 1, qty: 1}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testday2a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday2b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday2c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testday3a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday3b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday3c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testday4a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday4b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday4c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testday5a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday5b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday5c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testday6a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday6b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday6c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday7a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday7b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday7c', size: 1, qty: 1}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday8a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday8b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday8c', size: 1, qty: 1}}
            ]
        }
      ],
    nightRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testnight1a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight1b', size: 1, qty: 1}}, {
              supports40: false,
              release: {release: 'testnight1c', size: 1, qty: 1}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testnight2a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight2b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight2c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testnight3a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight3b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight3c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testnight4a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight4b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight4c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testnight5a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight5b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight5c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testnight6a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight6b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight6c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight7a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight7b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight7c', size: 1, qty: 1}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight8a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight8b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight8c', size: 1, qty: 1}}
            ]
        }
      ],
  },
  {
    id: 'truck3', dayRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testday1a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday1b', size: 1, qty: 1}}, {
              supports40: false,
              release: {release: 'testday1c', size: 1, qty: 1}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testday2a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday2b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday2c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testday3a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday3b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday3c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testday4a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday4b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday4c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testday5a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday5b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday5c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testday6a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday6b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday6c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday7a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday7b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday7c', size: 1, qty: 1}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday8a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testday8b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testday8c', size: 1, qty: 1}}
            ]
        }
      ],
    nightRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testnight1a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight1b', size: 1, qty: 1}}, {
              supports40: false,
              release: {release: 'testnight1c', size: 1, qty: 1}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testnight2a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight2b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight2c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testnight3a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight3b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight3c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testnight4a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight4b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight4c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testnight5a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight5b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight5c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testnight6a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight6b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight6c', size: 1, qty: 1}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight7a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight7b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight7c', size: 1, qty: 1}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight8a', size: 1, qty: 1}}, {supports40: true, release: {release: 'testnight8b', size: 1, qty: 1}}, {supports40: false, release: {release: 'testnight8c', size: 1, qty: 1}}
            ]
        }
      ],
  }
];

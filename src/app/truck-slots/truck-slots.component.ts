import {Component, Input, OnInit} from '@angular/core';
import {Release} from '../planning-release-grid/planning-release-grid.component';
import {Slot} from '../planning-truck-grid/planning-truck-grid.component';
import {DragHelperService} from '../drag-helper.service';
import {MatDialog} from '@angular/material';
import {WarningPopupComponent} from '../warning-popup/warning-popup.component';

@Component({
  selector: 'app-truck-slots',
  templateUrl: './truck-slots.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckSlotsComponent implements OnInit {
  // Input of data from parent component
  @Input() slots: Slot[];

  // Two-way binding for the component
  releases: Release[];

  // Injects the dragHelper service and the dialog for warnings
  constructor(private draghelperService: DragHelperService, public dialog: MatDialog) {
  }

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
      const movedRelease = this.draghelperService.getRelease();
      this.draghelperService.onReleaseEnd();

      if (movedRelease.size === 40) {
        // This implementation does not check to see if there is already a 40 in the truck and handle that interaction
        if (i === 2) {
          if (!this.releases[1]) {
            this.releases[1] = movedRelease;
            this.releases[2] = movedRelease;
          } else {
            if (!this.releases[0]) {
              this.releases[0] = this.releases[1];
              this.releases[1] = movedRelease;
              this.releases[2] = movedRelease;
            } else {
              this.openDialog('Do you wish to replace: ' + this.releases[1].release + '. With: ' + movedRelease.release)
                .afterClosed().subscribe((result: string) => {
                if (result === 'a') {
                  this.releases[1] = movedRelease;
                  this.releases[2] = movedRelease;
                } else if (result === 'c') {
                  // Do nothing
                }
              });
            }
          }
        } else if (i === 1) {
          if (!this.releases[2]) {
            this.releases[1] = movedRelease;
            this.releases[2] = movedRelease;
          } else {
            if (!this.releases[0]) {
              this.releases[0] = this.releases[2];
              this.releases[1] = movedRelease;
              this.releases[2] = movedRelease;
            } else {
              this.openDialog('Do you wish to replace: ' + this.releases[2].release + '. With: ' + movedRelease.release)
                .afterClosed().subscribe((result: string) => {
                if (result === 'a') {
                  this.releases[1] = movedRelease;
                  this.releases[2] = movedRelease;
                } else if (result === 'c') {
                  // Do nothing
                }
              });
            }
          }
        } else if (i === 0) {
          if (!this.releases[1]) {
            this.releases[0] = movedRelease;
            this.releases[1] = movedRelease;
          } else {
            if (!this.releases[2]) {
              this.releases[2] = this.releases[0];
              this.releases[0] = movedRelease;
              this.releases[1] = movedRelease;
            } else {
              this.openDialog('Do you wish to replace: ' + this.releases[1].release + '. With: ' + movedRelease.release)
                .afterClosed().subscribe((result: string) => {
                if (result === 'a') {
                  this.releases[0] = movedRelease;
                  this.releases[1] = movedRelease;
                } else if (result === 'c') {
                  // Do nothing
                }
              });
            }
          }
        }
      } else if (movedRelease.size === 20) {
        this.releases[i] = movedRelease;
      }
    }
  }

  openDialog(message: string) {
    return this.dialog.open(WarningPopupComponent, {
      width: '500px',
      height: '500px',
      data: {message: message, options: [true, true, false], result: ['c', 'a', 'c', '']},
      panelClass: 'warningPopupClass'
    });
  }
}

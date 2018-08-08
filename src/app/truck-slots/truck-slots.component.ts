import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DragHelperService} from '../drag-helper.service';
import {MatDialog} from '@angular/material';
import {WarningPopupComponent} from '../warning-popup/warning-popup.component';
import {Release, Slot} from "../interfaces";

@Component({
  selector: 'app-truck-slots',
  templateUrl: './truck-slots.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckSlotsComponent implements OnInit {
  // Input of data from parent component
  @Input() slots: Slot[];
  @Input() truckID: number;

  // Outputs an event when the slot is updated
  @Output() updated = new EventEmitter();

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
    let updated: boolean = false;
    if (this.draghelperService.getRelease()) {
      const movedRelease = this.draghelperService.getRelease();
      this.draghelperService.onReleaseEnd();

      if (movedRelease.size === 40) {
        if (this.releases[0].size === 40 || this.releases[1].size === 40) {
          // Means that a 40 is already in a slot and will need to be handled or overwritten.
        }

        // This implementation does not check to see if there is already a 40 in the truck and handle that interaction
        if (i === 2) {
          if (!this.releases[1]) {
            this.releases[1] = movedRelease;
            this.releases[2] = movedRelease;
            updated = true;
          } else {
            if (!this.releases[0]) {
              this.releases[0] = this.releases[1];
              this.releases[1] = movedRelease;
              this.releases[2] = movedRelease;
              updated = true;
            } else {
              this.openDialog('Replace Data',['Do you wish to replace: ' + this.releases[1].release +
              ', with: ' + movedRelease.release, null])
                .afterClosed().subscribe((result: string) => {
                if (result === 'a') {
                  this.releases[1] = movedRelease;
                  this.releases[2] = movedRelease;
                  this.updated.emit(this.truckID);
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
            updated = true;
          } else {
            if (!this.releases[0]) {
              this.releases[0] = this.releases[2];
              this.releases[1] = movedRelease;
              this.releases[2] = movedRelease;
              updated = true;
            } else {
              this.openDialog('Replace Data',['Do you wish to replace: ' + this.releases[2].release +
              ', with: ' + movedRelease.release, null])
                .afterClosed().subscribe((result: string) => {
                if (result === 'a') {
                  this.releases[1] = movedRelease;
                  this.releases[2] = movedRelease;
                  this.updated.emit(this.truckID);
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
            updated = true;
          } else {
            if (!this.releases[2]) {
              this.releases[2] = this.releases[0];
              this.releases[0] = movedRelease;
              this.releases[1] = movedRelease;
              updated = true;
            } else {
              this.openDialog('Replace Data', ['Do you wish to replace: ' + this.releases[1].release +
              ', with: ' + movedRelease.release, null])
                .afterClosed().subscribe((result: string) => {
                if (result === 'a') {
                  this.releases[0] = movedRelease;
                  this.releases[1] = movedRelease;
                  this.updated.emit(this.truckID);
                } else if (result === 'c') {
                  // Do nothing
                }
              });
            }
          }
        }
      } else if (movedRelease.size === 20) {
        if (this.releases[i].size === 40) {
          // Means that there is a 40 in the slot already and will need to find the other part and possibly overwrite

          if (i === 0) {
            if (this.releases[1].size === 40) {
              // Found the rest of the 40
            }
          } else if (i === 1) {
            if (this.releases[0].size === 40) {
              // Found the rest of the 40
            } else if (this.releases[2].size === 40) {
              // Found the rest of the 40 on the other side
            }
          }
        } else {
          this.releases[i] = movedRelease;
          updated = true;
        }
      }
    }

    if (updated) {
      this.updated.emit(this.truckID);
    }
  }

  // Opens a warning popup to notify the user that there is a clash
  openDialog(message: string, body?: string[], result?: string[], options?: boolean[]) {
    return this.dialog.open(WarningPopupComponent, {
      width: '280px',
      height: '235px',
      data: {body: body ? body : null, message: message, options: options ? options : [true, true, false],
        result: result ? result : ['c', 'a', 'c', '']},
      panelClass: 'warningPopupClass'
    });
  }
}

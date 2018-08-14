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
        // moving 40's
        if (this.releases[i]) {
          // there is something in the way check that it isn't a 40
          if (this.releases[i].size === 40) {
            // there is a 40 there we need to find the rest of the 40 and see if it should be overwritten
            if (i === 0) {
              if (this.releases[1].release === this.releases[i].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[i] = movedRelease;
                    updated = true;
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else {
                // This is an invalid state
                console.log('How did this happen to me: 1');
                console.log(this.releases[i]);
                console.log(movedRelease);
              }
            } else if (i === 1) {
              if (this.releases[0].release === this.releases[i].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[0] = movedRelease;
                    this.releases[i] = movedRelease;
                    updated = true;
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else if (this.releases[2].release === this.releases[i].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[2] = movedRelease;
                    this.releases[i] = movedRelease;
                    updated = true;
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else {
                // this is an invalid state
                console.log('How could this happen to me: 2');
                console.log(this.releases[i]);
                console.log(movedRelease);
              }
            } else if (i === 2) {
              if (this.releases[1].release === this.releases[i].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[i] = movedRelease;
                    updated = true;
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else {
                // this is an invalid state
                console.log('How could this happen to me: 3');
                console.log(this.releases[i]);
                console.log(movedRelease);
              }
            }
          } else {
            // it's a 20 so we need to check that the 40 will fit
            if (i === 0) {
              // check that i = 1 can be replaced and will need to be aware of if it is a forty
              if (this.releases[1].size === 40) {
                // need to check that i = 2 is the same 40
                if (this.releases[1].release === this.releases[2].release) {
                  // if this is a forty we just offer to replace the 40 rather than the 20
                  this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ' and ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                    if (result === 'a') {
                      this.releases[1] = movedRelease;
                      this.releases[2] = movedRelease;
                      updated = true;
                    } else if (result === 'c') {
                      // Do nothing
                    }
                  });
                } else {
                  // invalid state
                  console.log('How could this happen to me: 4');
                  console.log(this.releases[i]);
                  console.log(movedRelease);
                }
              } else {
                // i = 1 is a 20 so we just ask to replace it
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[i] = movedRelease;
                    updated = true;
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              }
            } else if (i === 1) {
              // check that it will fit in i = 2 then if not will it fit in i = 0
              if (this.releases[2]) {
                // there is something there need to ask to replace
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[2] = movedRelease;
                    updated = true;
                  } else if (result === 'c') {
                    // if not allowed to replace try to replace i = 0
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        updated = true;
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  }
                });
              } else {
                // just overwrite i = 1 and write to i = 2
                this.releases[1] = movedRelease;
                this.releases[2] = movedRelease;
              }
            } else if (i === 2) {
              // check that i = 1 can be replaced ...
              if (this.releases[1]) {
                // there is something there need to see if it will fit and that it isn't a 40
                if (this.releases[1].size === 40) {
                  // need to check that i = 2 is the same 40
                  if (this.releases[1].release === this.releases[0].release) {
                    // if this is a forty we just offer to replace the 40 rather than the 20
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ' and ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        updated = true;
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  } else {
                    // invalid state
                    console.log('How could this happen to me: 5');
                    console.log(this.releases[i]);
                    console.log(movedRelease);
                  }
                } else {
                  // i = 1 is a 20 so can just ask to replace it
                  this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                    if (result === 'a') {
                      this.releases[1] = movedRelease;
                      this.releases[2] = movedRelease;
                      updated = true;
                    } else if (result === 'c') {
                      // Do nothing
                    }
                  });
                }
              }
            }
          }
        }
      } else {
        // moving 20's
        if (this.releases[i]) {
          // There is something here already
          if (this.releases[i].size === 40) {
            // need to find the rest of the forty and ask to replace/delete
            if (i === 0) {
              // the 40 should be at i = 1
              if (this.releases[0].release === this.releases[1].release) {
                // Found the forty and need to replace/delete or replace i = 2
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[0] = movedRelease;
                    this.releases[1] = null;
                    updated = true;
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 2
                    if (this.releases[2]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          this.releases[2] = movedRelease;
                          updated = true;
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      this.releases[2] = movedRelease;
                    }
                  }
                });
              } else {
                // invalid state
                console.log('How could this happen to me: 6');
                console.log(this.releases[i]);
                console.log(movedRelease);
              }
            } else if (i === 1) {
              if (this.releases[0].release === this.releases[1].release) {
                // Found the rest of the forty and need to replace/delete or replace i = 2
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[0] = null;
                    updated = true;
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 2
                    if (this.releases[2]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          this.releases[2] = movedRelease;
                          updated = true;
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      this.releases[2] = movedRelease;
                    }
                  }
                });
              } else if (this.releases[1].release === this.releases[2].release) {
                // Found the rest of the forty and need to replace/delete or replace i = 0
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[2] = null;
                    updated = true;
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 0
                    if (this.releases[0]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          this.releases[0] = movedRelease;
                          updated = true;
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      this.releases[0] = movedRelease;
                    }
                  }
                });
              }
            } else if (i === 2) {
              if (this.releases[1].release === this.releases[2].release) {
                // Found the rest of the forty and need to replace/delete or replace i = 0
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    this.releases[1] = movedRelease;
                    this.releases[2] = null;
                    updated = true;
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 0
                    if (this.releases[0]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          this.releases[0] = movedRelease;
                          updated = true;
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      this.releases[0] = movedRelease;
                    }
                  }
                });
              } else {
                // invalid state
                console.log('How could this happen to me: 7');
                console.log(this.releases[i]);
                console.log(movedRelease);
              }
            }
          } else {
            this.releases[i] = movedRelease;
          }
        }

      }
    }



    //   if (movedRelease.size === 40) {
    //     if (this.releases[0].size === 40) {
    //       // Means that a 40 is already in a slot and will need to be handled or overwritten.
    //       // Should split the above condition to save time
    //         if (i === 0) {
    //           this.openDialog('Replace Data', ['Do you wish to replace: ' + this.releases[1].release +
    //           ', with: ' + movedRelease.release], null).afterClosed().subscribe((result: string) => {
    //             if (result === 'a') {
    //
    //             } else if (result === 'c') {
    //
    //             }
    //           });
    //         } else if (i === 1) {
    //           this.openDialog('Replace Data', ['Do you wish to replace: ' + this.releases[0].release +
    //           ', with: ' + movedRelease.release], null).afterClosed().subscribe((result: string) => {
    //             if (result === 'a') {
    //
    //             } else if (result === 'c') {
    //
    //             }
    //           });
    //         } else {
    //           // Should not be relevant
    //         }
    //     } else if (this.releases[1].size === 40) {
    //       if (i === 0) {
    //         // Is this correct
    //         this.openDialog('Replace Data', ['Do you wish to replace: ' + this.releases[0].release +
    //         ', with: ' + movedRelease.release], null).afterClosed().subscribe((result: string) => {
    //           if (result === 'a') {
    //
    //           } else if (result === 'c') {
    //
    //           }
    //         });
    //       } else if (i === 1) {
    //         // Should not be relevant
    //       } else {
    //         // Is this correct
    //         this.openDialog('Replace Data', ['Do you wish to replace: ' + this.releases[2].release +
    //         ', with: ' + movedRelease.release], null).afterClosed().subscribe((result: string) => {
    //           if (result === 'a') {
    //
    //           } else if (result === 'c') {
    //
    //           }
    //         });
    //       }
    //     }
    //
    //     // This implementation does not check to see if there is already a 40 in the truck and handle that interaction
    //     if (i === 2) {
    //       if (!this.releases[1]) {
    //         this.releases[1] = movedRelease;
    //         this.releases[2] = movedRelease;
    //         updated = true;
    //       } else {
    //         if (!this.releases[0]) {
    //           this.releases[0] = this.releases[1];
    //           this.releases[1] = movedRelease;
    //           this.releases[2] = movedRelease;
    //           updated = true;
    //         } else {
    //           this.openDialog('Replace Data',['Do you wish to replace: ' + this.releases[1].release +
    //           ', with: ' + movedRelease.release, null])
    //             .afterClosed().subscribe((result: string) => {
    //             if (result === 'a') {
    //               this.releases[1] = movedRelease;
    //               this.releases[2] = movedRelease;
    //               this.updated.emit(this.truckID);
    //             } else if (result === 'c') {
    //               // Do nothing
    //             }
    //           });
    //         }
    //       }
    //     } else if (i === 1) {
    //       if (!this.releases[2]) {
    //         this.releases[1] = movedRelease;
    //         this.releases[2] = movedRelease;
    //         updated = true;
    //       } else {
    //         if (!this.releases[0]) {
    //           this.releases[0] = this.releases[2];
    //           this.releases[1] = movedRelease;
    //           this.releases[2] = movedRelease;
    //           updated = true;
    //         } else {
    //           this.openDialog('Replace Data',['Do you wish to replace: ' + this.releases[2].release +
    //           ', with: ' + movedRelease.release, null])
    //             .afterClosed().subscribe((result: string) => {
    //             if (result === 'a') {
    //               this.releases[1] = movedRelease;
    //               this.releases[2] = movedRelease;
    //               this.updated.emit(this.truckID);
    //             } else if (result === 'c') {
    //               // Do nothing
    //             }
    //           });
    //         }
    //       }
    //     } else if (i === 0) {
    //       if (!this.releases[1]) {
    //         this.releases[0] = movedRelease;
    //         this.releases[1] = movedRelease;
    //         updated = true;
    //       } else {
    //         if (!this.releases[2]) {
    //           this.releases[2] = this.releases[0];
    //           this.releases[0] = movedRelease;
    //           this.releases[1] = movedRelease;
    //           updated = true;
    //         } else {
    //           this.openDialog('Replace Data', ['Do you wish to replace: ' + this.releases[1].release +
    //           ', with: ' + movedRelease.release, null])
    //             .afterClosed().subscribe((result: string) => {
    //             if (result === 'a') {
    //               this.releases[0] = movedRelease;
    //               this.releases[1] = movedRelease;
    //               this.updated.emit(this.truckID);
    //             } else if (result === 'c') {
    //               // Do nothing
    //             }
    //           });
    //         }
    //       }
    //     }
    //   } else if (movedRelease.size === 20) {
    //     if (this.releases[i].size === 40) {
    //       // Means that there is a 40 in the slot already and will need to find the other part and possibly overwrite
    //
    //       if (i === 0) {
    //         if (this.releases[1].size === 40) {
    //           // Found the rest of the 40
    //         }
    //       } else if (i === 1) {
    //         if (this.releases[0].size === 40) {
    //           // Found the rest of the 40
    //         } else if (this.releases[2].size === 40) {
    //           // Found the rest of the 40 on the other side
    //         }
    //       }
    //     } else {
    //       this.releases[i] = movedRelease;
    //       updated = true;
    //     }
    //   }
    // }

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

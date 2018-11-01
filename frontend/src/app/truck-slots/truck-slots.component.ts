import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DragHelperService} from '../drag-helper.service';
import {MatDialog} from '@angular/material';
import {WarningPopupComponent} from '../warning-popup/warning-popup.component';
import {Change, Release, Slot} from '../interfaces';

@Component({
  selector: 'app-truck-slots',
  templateUrl: './truck-slots.component.html',
  styleUrls: ['../app.component.scss']
})
export class TruckSlotsComponent implements OnInit {
  // Input of data from parent component
  @Input() slots: Slot[];
  @Input() truckID: string;

  // Outputs an event when the slot is updated
  @Output() updated = new EventEmitter<Change>();

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
    // TODO check at appropriate times that the releases aren't null to ensure no issues
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
              if (this.releases[1]) {
                if (this.releases[1].release === this.releases[0].release) {
                  // this should be the same 40
                  this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                    if (result === 'a') {
                      let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[1] = movedRelease;
                      this.releases[0] = movedRelease;
                      this.slots[1].release = movedRelease;
                      this.slots[0].release = movedRelease;
                      this.updated.emit(change);
                    } else if (result === 'c') {
                      // Do nothing
                    }
                  });
                } else {
                  // This is an invalid state
                }
              }
            } else if (i === 1) {
              if (this.releases[0].release === this.releases[1].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[0] = movedRelease;
                    this.releases[1] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[0].release = movedRelease;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else if (this.releases[2].release === this.releases[1].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[2] = movedRelease;
                    this.releases[1] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[2].release = movedRelease;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else {
                // this is an invalid state
              }
            } else if (i === 2) {
              if (this.releases[1].release === this.releases[i].release) {
                // this should be the same 40
                this.openDialog('Replace release', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[2] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[2].release = movedRelease;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              } else {
                // this is an invalid state
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
                      let change = { increase1: this.releases[1], increase2: this.releases[2], decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[1] = movedRelease;
                      this.releases[2] = movedRelease;
                      this.slots[1].release = movedRelease;
                      this.slots[2].release = movedRelease;
                      this.updated.emit(change);
                    } else if (result === 'c') {
                      // Do nothing
                    }
                  });
                } else {
                  // invalid state
                }
              } else {
                // i = 1 is a 20 so we just ask to replace it
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[0] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[0].release = movedRelease;
                    this.updated.emit(change);
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
                    let change = { increase1: this.releases[1], increase2: this.releases[2], decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[2] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[2].release = movedRelease;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // if not allowed to replace try to replace i = 0
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[1], increase2: this.releases[0], decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  }
                });
              } else {
                // just overwrite i = 1 and write to i = 2
                let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                this.releases[1] = movedRelease;
                this.releases[2] = movedRelease;
                this.slots[1].release = movedRelease;
                this.slots[2].release = movedRelease;
                this.updated.emit(change);
              }
            } else if (i === 2) {
              // check that i = 1 can be replaced
              if (this.releases[1]) {
                // there is something there need to see if it will fit and that it isn't a 40
                if (this.releases[1].size === 40) {
                  // need to check that i = 2 is the same 40
                  if (this.releases[1].release === this.releases[0].release) {
                    // if this is a forty we just offer to replace the 40 rather than the 20
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ' and ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  } else if (this.releases[1].release === this.releases[2].release) {
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ' and ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  }
                } else {
                  // i = 1 is a 20 so can just ask to replace it
                  this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                    if (result === 'a') {
                      let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[1] = movedRelease;
                      this.releases[2] = movedRelease;
                      this.slots[1].release = movedRelease;
                      this.slots[2].release = movedRelease;
                      this.updated.emit(change);
                    } else if (result === 'c') {
                      // Do nothing
                    }
                  });
                }
              }
            }
          }
        } else {
          // Nothing there
          if (i === 0) {
            if (this.releases[1]) {
              if (this.releases[1].size === 40) {
                if (this.releases[2]) {
                  if (this.releases[2].release === this.releases[1].release) {
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[2] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[2].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  } else {
                    // Invalid state
                  }
                } else {
                  // Invalid state
                }
              } else {
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[0] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[0].release = movedRelease;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              }
            } else {
              let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
              this.releases[0] = movedRelease;
              this.releases[1] = movedRelease;
              this.slots[1].release = movedRelease;
              this.slots[0].release = movedRelease;
              this.updated.emit(change);
            }
          } else if (i === 1) {
            if (this.releases[1]) {
              if (this.releases[1].size === 40) {
                if (this.releases[2]) {
                  if (this.releases[2].release === this.releases[1].release) {
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[2], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[2] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[2].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  } else {
                    if (this.releases[0]) {
                      if (this.releases[0].release === this.releases[1].release) {
                        this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                          if (result === 'a') {
                            let change = { increase1: this.releases[0], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                            this.releases[1] = movedRelease;
                            this.releases[0] = movedRelease;
                            this.slots[1].release = movedRelease;
                            this.slots[0].release = movedRelease;
                            this.updated.emit(change);
                          } else if (result === 'c') {
                            // Do nothing
                          }
                        });
                      }
                    }
                  }
                }
              } else {
                if (this.releases[2]) {
                  if (this.releases[0]) {
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[0], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                          if (result === 'a') {
                            let change = { increase1: this.releases[2], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                            this.releases[1] = movedRelease;
                            this.releases[2] = movedRelease;
                            this.slots[1].release = movedRelease;
                            this.slots[2].release = movedRelease;
                            this.updated.emit(change);
                          } else if (result === 'c') {
                            // Do nothing
                          }
                        });
                      }
                    });
                  } else {
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  }
                } else {
                  this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                    if (result === 'a') {
                      let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[1] = movedRelease;
                      this.releases[2] = movedRelease;
                      this.slots[1].release = movedRelease;
                      this.slots[2].release = movedRelease;
                      this.updated.emit(change);
                    } else if (result === 'c') {
                      // Do nothing
                    }
                  });
                }
              }
            } else {
              if (this.releases[2]) {
                if (this.releases[2].size === 40) {
                  // Invalid State?
                } else {
                  this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                    if (result === 'a') {
                      let change = { increase1: this.releases[2], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[1] = movedRelease;
                      this.releases[2] = movedRelease;
                      this.slots[1].release = movedRelease;
                      this.slots[2].release = movedRelease;
                      this.updated.emit(change);
                    } else if (result === 'c') {
                      if (this.releases[0]) {
                        this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                          if (result === 'a') {
                            let change = { increase1: this.releases[0], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                            this.releases[1] = movedRelease;
                            this.releases[0] = movedRelease;
                            this.slots[1].release = movedRelease;
                            this.slots[0].release = movedRelease;
                            this.updated.emit(change);
                          } else if (result === 'c') {
                            // Do nothing
                          }
                        });
                      } else {
                        let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      }
                    }
                  });
                }
              } else {
                let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                this.releases[1] = movedRelease;
                this.releases[2] = movedRelease;
                this.slots[1].release = movedRelease;
                this.slots[2].release = movedRelease;
                this.updated.emit(change);
              }
            }
          } else if (i === 2) {
            if (this.releases[1]) {
              if (this.releases[1].size === 40) {
                if (this.releases[0]) {
                  if (this.releases[0].release === this.releases[1].release) {
                    this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                      if (result === 'a') {
                        let change = { increase1: this.releases[0], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                        this.releases[1] = movedRelease;
                        this.releases[0] = movedRelease;
                        this.slots[1].release = movedRelease;
                        this.slots[0].release = movedRelease;
                        this.updated.emit(change);
                      } else if (result === 'c') {
                        // Do nothing
                      }
                    });
                  }
                } else {
                  if (this.releases[2]) {
                    if (this.releases[2].release === this.releases[1].release) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                          this.releases[1] = movedRelease;
                          this.releases[2] = movedRelease;
                          this.slots[1].release = movedRelease;
                          this.slots[2].release = movedRelease;
                          this.updated.emit(change);
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      // Invalid state
                    }
                  }
                }
              } else {
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[2] = movedRelease;
                    this.slots[1].release = movedRelease;
                    this.slots[2].release = movedRelease;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Do nothing
                  }
                });
              }
            } else {
              let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
              this.releases[i] = movedRelease;
              this.releases[1] = movedRelease;
              this.slots[1].release = movedRelease;
              this.slots[i].release = movedRelease;
              this.updated.emit(change);
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
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[0] = movedRelease;
                    this.releases[1] = null;
                    this.slots[0].release = movedRelease;
                    this.slots[1].release = null;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 2
                    if (this.releases[2]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          let change = { increase1: this.releases[2], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                          this.releases[2] = movedRelease;
                          this.slots[2].release = movedRelease;
                          this.updated.emit(change);
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[2] = movedRelease;
                      this.slots[2].release = movedRelease;
                      this.updated.emit(change);
                    }
                  }
                });
              } else {
                // invalid state
              }
            } else if (i === 1) {
              if (this.releases[0].release === this.releases[1].release) {
                // Found the rest of the forty and need to replace/delete or replace i = 2
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[0] = null;
                    this.slots[1].release = movedRelease;
                    this.slots[0].release = null;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 2
                    if (this.releases[2]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          let change = { increase1: this.releases[2], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                          this.releases[2] = movedRelease;
                          this.slots[2].release = movedRelease;
                          this.updated.emit(change);
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      let change = { increase1: this.releases[2], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[2] = movedRelease;
                      this.slots[2].release = movedRelease;
                      this.updated.emit(change);
                    }
                  }
                });
              } else if (this.releases[1].release === this.releases[2].release) {
                // Found the rest of the forty and need to replace/delete or replace i = 0
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[2].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[2] = null;
                    this.slots[1].release = movedRelease;
                    this.slots[2].release = null;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 0
                    if (this.releases[0]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          let change = { increase1: this.releases[0], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                          this.releases[0] = movedRelease;
                          this.slots[0].release = movedRelease;
                          this.updated.emit(change);
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[0] = movedRelease;
                      this.slots[0].release = movedRelease;
                      this.updated.emit(change);
                    }
                  }
                });
              }
            } else if (i === 2) {
              if (this.releases[1].release === this.releases[2].release) {
                // Found the rest of the forty and need to replace/delete or replace i = 0
                this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[1].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                  if (result === 'a') {
                    let change = { increase1: this.releases[1], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                    this.releases[1] = movedRelease;
                    this.releases[2] = null;
                    this.slots[1].release = movedRelease;
                    this.slots[2].release = null;
                    this.updated.emit(change);
                  } else if (result === 'c') {
                    // Need to see if there is something that might need to be replaced in i = 0
                    if (this.releases[0]) {
                      this.openDialog('Replace releases', ['Do you wish to replace: ' + this.releases[0].release + ', with: ' + movedRelease.release + '?']).afterClosed().subscribe((result: string) => {
                        if (result === 'a') {
                          let change = { increase1: this.releases[0], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                          this.releases[0] = movedRelease;
                          this.slots[0].release = movedRelease;
                          this.updated.emit(change);
                        } else if (result === 'c') {
                          // Do nothing
                        }
                      });
                    } else {
                      let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
                      this.releases[0] = movedRelease;
                      this.slots[0].release = movedRelease;
                      this.updated.emit(change);
                    }
                  }
                });
              } else {
                // invalid state
              }
            }
          } else {
            let change = { increase1: this.releases[i], increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
            this.releases[i] = movedRelease;
            this.slots[i].release = movedRelease;
            this.updated.emit(change);
          }
        } else {
          let change = { increase1: null, increase2: null, decrease1: movedRelease, decrease2: null, truckID: `${this.truckID}`};
          this.releases[i] = movedRelease;
          this.slots[i].release = movedRelease;
          this.updated.emit(change);
        }
      }
    }
  }

  deleteRelease(i) {
    if (this.releases[i]) {
      if (this.releases[i].size === 40) {
        let tmp = this.releases[i];
        if (i === 0) {
          if (this.releases[0].release === this.releases[1].release) {
            this.openDialog('Remove Release', ['Would you like to remove: ' + tmp.release]).afterClosed().subscribe((result) => {
              if (result === 'a') {
                this.releases[i] = null;
                this.releases[1] = null;
                this.slots[i].release = null;
                this.slots[1].release = null;
                this.updated.emit({increase1: tmp, increase2: tmp, decrease1: null, decrease2: null, truckID: this.truckID});
              } else if (result === 'c') {
                // Do nothing
              }
            });
          }
        } else if (i === 1) {
          if (this.releases[0].release === this.releases[1].release) {
              this.openDialog('Remove Release', ['Would you like to remove: ' + tmp.release]).afterClosed().subscribe((result) => {
                if (result === 'a') {
                  this.releases[i] = null;
                  this.releases[1] = null;
                  this.slots[i].release = null;
                  this.slots[1].release = null;
                  this.updated.emit({increase1: tmp, increase2: tmp, decrease1: null, decrease2: null, truckID: this.truckID});
                } else if (result === 'c') {
                  // Do nothing
                }
              });
          } else if (this.releases[1].release === this.releases[2].release) {
              this.openDialog('Remove Release', ['Would you like to remove: ' + tmp.release]).afterClosed().subscribe((result) => {
                if (result === 'a') {
                  this.releases[i] = null;
                  this.releases[2] = null;
                  this.slots[i].release = null;
                  this.slots[2].release = null;
                  this.updated.emit({increase1: tmp, increase2: tmp, decrease1: null, decrease2: null, truckID: this.truckID});
                } else if (result === 'c') {
                  // Do nothing
                }
              });
          }
        } else if (i === 2) {
          if (this.releases[2].release === this.releases[1].release) {
            this.openDialog('Remove Release', ['Would you like to remove: ' + tmp.release]).afterClosed().subscribe((result) => {
              if (result === 'a') {
                this.releases[i] = null;
                this.releases[1] = null;
                this.slots[i].release = null;
                this.slots[1].release = null;
                this.updated.emit({increase1: tmp, increase2: tmp, decrease1: null, decrease2: null, truckID: this.truckID});
              } else if (result === 'c') {
                // Do nothing
              }
            });
          }
        }
      } else {
        let tmp = this.releases[i];
        this.openDialog('Remove Release', ['Would you like to remove: ' + tmp.release]).afterClosed().subscribe((result) => {

          // The method call for a test run of the completeDialog method
          // this.completeDialog(result, i, null, null, null, false);

          if (result === 'a') {
            // Is this the correct way to represent this?
            this.releases[i] = null;
            this.slots[i].release = null;
            this.updated.emit({increase1: tmp, increase2: null, decrease1: null, decrease2: null, truckID: this.truckID});
          } else if (result === 'c') {
            // Do nothing
          }
        });
      }
    }
  }

  // Possibly try to complete this method to simplify these functions.
  private completeDialog(result, a : number, b : number, releaseA : Release, releaseB : Release, increase : boolean, fail?, failData?) {
    if (result === 'a') {
      let tmpA;
      let tmpB;

      if (a) {
        tmpA = this.releases[a];
        this.releases[a] = releaseA;
      }

      if (b) {
        tmpB = this.releases[b];
        this.releases[b] = releaseB;
      }

      if (increase) {
        this.updated.emit({increase1: releaseA, increase2: releaseB, decrease1: tmpA, decrease2: tmpB, truckID: this.truckID});
      } else {
        this.updated.emit({increase1: tmpA, increase2: tmpB, decrease1: releaseA, decrease2: releaseB, truckID: this.truckID});
      }
    } else if (result === 'c') {
      // Doesn't this generally make another dialog if relevant?
      if (fail) {
        fail(failData);
      }
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

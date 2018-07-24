import { Injectable } from '@angular/core';
import {Release} from "./planning-release-grid/planning-release-grid.component";

@Injectable({
  providedIn: 'root'
})
export class DraghelperService {

  constructor() { }

  constructor() {
  }

  private currentRelease : Release;

  onReleaseGrab(release : Release) {
    console.log('setting release');
    this.currentRelease = release;
  }

  onReleaseEnd() {
    this.currentRelease = null;
  }

  getRelease()
  {
    console.log('giving release');
    return this.currentRelease;
  }
}

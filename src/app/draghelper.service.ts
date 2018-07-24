import { Injectable } from '@angular/core';
import {Release} from './planning-release-grid/planning-release-grid.component';

@Injectable({
  providedIn: 'root'
})
export class DraghelperService {

  private currentRelease: Release;

  onReleaseGrab(release: Release) {
    this.currentRelease = release;
  }

  onReleaseEnd() {
    this.currentRelease = null;
  }

  getRelease() {
    return this.currentRelease;
  }
}

import { Injectable } from '@angular/core';
import {Release} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class DragHelperService {

  // State information for the current release being dragged
  private currentRelease: Release;

  // Listener for when a release is grabbed
  onReleaseGrab(release: Release) {
    this.currentRelease = release;
  }

  // Listener for when release is dropped. Reset for state.
  onReleaseEnd() {
    this.currentRelease = null;
  }

  // Return the current release being dragged
  getRelease() {
    return this.currentRelease;
  }
}

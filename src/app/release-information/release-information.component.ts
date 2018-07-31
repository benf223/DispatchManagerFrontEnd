import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebService} from '../web.service';

@Component({
  selector: 'app-release-information',
  templateUrl: './release-information.component.html',
  styleUrls: ['./release-information.component.css']
})
export class ReleaseInformationComponent implements OnInit {
  // The full release from the API
  fullRelease: FullRelease;

  // Injects the webservice and other data from the parent component
  constructor(/* public dialogRef: MatDialogRef<ReleaseInformationComponent>, */@Inject(MAT_DIALOG_DATA) public data: string,
              private webService: WebService) {
  }

  // Retrieves the required data from the Webservice before displaying it
  ngOnInit() {
    this.fullRelease = { release: null, qtyTwenty: null, qtyForty: null, colour: null};
    this.webService.getFullRelease(this.data);

    this.webService.fullRelease.subscribe(() => {
      this.fullRelease = this.webService.fullReleaseStore;
    });

    // this.dialogRef.id;
  }

}

// Initial draft interface for a Full Releases information
export interface FullRelease {
  release: string;
  qtyForty: number;
  qtyTwenty: number;
  colour: string;
}

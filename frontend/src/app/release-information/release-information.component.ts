import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {WebService} from '../web.service';
import {FullRelease} from '../interfaces';

@Component({
  selector: 'app-release-information',
  templateUrl: './release-information.component.html',
  styleUrls: ['./release-information.component.css']
})
export class ReleaseInformationComponent implements OnInit {

  // The full release from the API
  fullRelease: FullRelease = {release: 'Loading', qtyTwenty: 0, qtyForty: 0, colour: '#FFF'};

  // Injects the webservice and other data from the parent component
  constructor(
              /* public dialogRef: MatDialogRef<ReleaseInformationComponent>, */
              @Inject(MAT_DIALOG_DATA) public data: string,
              private webService: WebService) {
  }

  // Retrieves the required data from the Webservice before displaying it
  ngOnInit() {
    this.webService.getFullRelease(this.data);

    this.webService.fullRelease.subscribe(() => {
      if (this.webService.fullReleaseStore) {
        this.fullRelease = this.webService.fullReleaseStore;
      }
    });
  }
}


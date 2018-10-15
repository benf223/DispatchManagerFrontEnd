import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {WebService} from '../services/web.service';
import {FullRelease} from '../interfaces';

@Component({
  selector: 'app-release-information',
  templateUrl: './release-information.component.html',
  styleUrls: ['./release-information.component.css']
})
export class ReleaseInformationComponent implements OnInit {

  // The full release from the API
  fullRelease: FullRelease = null;//{release: 'Loading', qtyTwenty: 0, qtyForty: 0, colour: '#FFF'};

  // Injects the webservice and other data from the parent component
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private webService: WebService) {}

  // Retrieves the required data from the Webservice before displaying it
  ngOnInit() {
    this.webService.getFullRelease(this.data);

    this.webService.fullRelease.subscribe((fullRelease) => {
      if (fullRelease) {
        this.fullRelease = fullRelease;
      }
    });
  }
}


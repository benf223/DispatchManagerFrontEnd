import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {WebService} from "../web.service";

@Component({
  selector: 'app-release-information',
  templateUrl: './release-information.component.html',
  styleUrls: ['./release-information.component.css']
})
export class ReleaseInformationComponent implements OnInit
{
  private fullRelease : FullRelease;

  constructor(public dialogRef: MatDialogRef<ReleaseInformationComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private webService : WebService)
  {
  }

  ngOnInit()
  {
    this.fullRelease = { release: null, qtyTwenty: null, qtyForty: null, colour: null};
    this.webService.getFullRelease(this.data);

    this.webService.fullRelease.subscribe(() => {
      this.fullRelease = this.webService.fullReleaseStore;
    })

    this.dialogRef.id
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface FullRelease {
  release: string;
  qtyForty: number;
  qtyTwenty: number;
  colour: string;
}

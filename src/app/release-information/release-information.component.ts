import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Release} from "../planning-release-grid/planning-release-grid.component";

@Component({
  selector: 'app-release-information',
  templateUrl: './release-information.component.html',
  styleUrls: ['./release-information.component.css']
})
export class ReleaseInformationComponent implements OnInit
{

  constructor(public dialogRef: MatDialogRef<ReleaseInformationComponent>, @Inject(MAT_DIALOG_DATA) public data: Release)
  {
  }

  ngOnInit()
  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

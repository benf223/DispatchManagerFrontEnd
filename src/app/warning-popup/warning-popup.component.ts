import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.css']
})
export class WarningPopupComponent implements OnInit {

  // Injects relevant data for the popup
  constructor(public dialogRef: MatDialogRef<WarningPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Warning) {
  }

  // Subscribes to the backdrop click event
  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onBackdropClick();
    })
  }

  // Listener for when the backdrop is clicked
  onBackdropClick() {
    this.dialogRef.close(this.data.result[0]);
  }

  // Listener for the OK button
  onOk() {
    this.dialogRef.close(this.data.result[1]);
  }

  // Listener for the Cancel button
  onCancel() {
    this.dialogRef.close(this.data.result[2]);
  }

  // Listener for the Unused button
  onUnused() {
    this.dialogRef.close(this.data.result[3]);
  }
}

// Interface for the data input type
// message: the string to be displayed in the dialog as a header
// body: (to be implemented?)
// options: boolean array specifying which buttons to enable in the popup 0=OK 1=Cancel 2=Unused
// result: string array of data to be returned depending on button press 0=Click outside dialog 1=OK 2=Cancel 3=Unused
export interface Warning
{
  message: string;
  options: boolean[];   // Defines what buttons should be available
  result: string[];     // Defines the form of response from the dialog
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Warning} from '../interfaces';

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
    });
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

  // Listener for buttons defined by another component
  onDefined1()
  {
    this.dialogRef.close(this.data.result[3]);
  }

  // Listener for buttons defined by another component
  onDefined2()
  {
    this.dialogRef.close(this.data.result[4]);
  }

  // Listener for the Unused button
  onUnused() {
    this.dialogRef.close(this.data.result[5]);
  }
}



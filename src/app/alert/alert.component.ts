import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-alert',
  template: ``,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // Data about the alert to be displayed
  private subscription: Subscription;

  // Inject the alert service
  constructor(private alertService: AlertService, public snackBar : MatSnackBar) { }

  // Subscribes to the alert service
  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      if (message)
      {
        console.log(message);
        this.snackBar.open(message.text, "OK", {
          duration: 2000
        });
      }
    });
  }

  // Clears the subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

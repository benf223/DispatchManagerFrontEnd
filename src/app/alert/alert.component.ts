import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // Data about the alert to be displayed
  private subscription: Subscription;
  message: any;

  // Inject the alert service
  constructor(private alertService: AlertService) { }

  // Subscribes to the alert service
  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  // Clears the subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

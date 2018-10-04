import {Component, OnInit} from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.scss']
})
export class HomeComponent implements OnInit {

  // Injects the WebService
  constructor(public webService: WebService) {
  }

  // Gets the messages from the WebService
  ngOnInit() {
    this.webService.spinUpAPI();
  }

  onClick(event) {
    console.log(event);
    return false;
  }
}

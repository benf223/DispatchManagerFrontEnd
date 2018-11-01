import {Component, OnInit} from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningComponent implements OnInit {

  // Injects the WebService
  constructor(private webService: WebService) {}

  ngOnInit() {
  }

  // Retrieves the current day in a format the API will understand
  // Unused?
  private getCurrentDay() {
    const date = new Date();

    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }

  // Causes the WebService to retrieve the specified day.
  changeDay(day) {
    this.webService.setCurrentDay(day);
    this.webService.getReleases(day);
    this.webService.getRounds(day);
  }
}

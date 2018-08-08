import {Component, OnInit} from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningComponent implements OnInit {

  // Injects the webservice
  constructor(private webService: WebService) {}

  // Updates the component and children to the current day.
  ngOnInit() {
    // this.changeDay(this.getCurrentDay());
  }

  // Retrieves the current day in a format the API will understand
  private getCurrentDay() {
    const date = new Date();

    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }

  // Causes the webservice to retrieve the specified day
  changeDay(day) {
    this.webService.setCurrentDay(day);
    this.webService.getReleases(day);
    this.webService.getRounds(day);
  }
}

import {Component, OnInit} from '@angular/core';
import {WebService} from '../services/web.service';

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

  // Causes the WebService to retrieve the specified day.
  changeDay(day) {
    this.webService.setCurrentDay(day);
    this.webService.getReleases(day);
    this.webService.getRounds(day);
  }
}

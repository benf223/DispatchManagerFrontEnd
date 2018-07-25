import {Component, OnInit} from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningComponent implements OnInit {

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.changeDay(this.getCurrentDay());
  }

  private getCurrentDay() {
    const date = new Date();
    const dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    return dateString;
  }

  changeDay(day) {
    this.webService.setCurrentDay(day);
    this.webService.getReleases(day);
    this.webService.getRounds(day);
  }

}

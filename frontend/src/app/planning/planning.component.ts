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
    this.changeDay('17-7-18');
  }

  changeDay(day) {
    this.webService.getReleases(day);
    this.webService.getRounds(day);
  }

}

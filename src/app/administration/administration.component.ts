import { Component, OnInit } from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  truckName : String;

  constructor(private webService : WebService) { }

  ngOnInit() {
  }

  createTruck() {
    console.log(this.truckName);
    this.truckName = '';

    this.webService.addTruck(this.truckName);

  }

}

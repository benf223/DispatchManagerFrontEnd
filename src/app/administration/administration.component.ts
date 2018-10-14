import { Component, OnInit } from '@angular/core';
import {WebService} from '../services/web.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  // Two-way bound variable to hold a name for a truck being added
  truckName : String;

  // Inject the WebService
  constructor(private webService : WebService) { }

  ngOnInit() {
  }

  // Listener for the add truck button to add a truck.
  createTruck() {
    this.webService.addTruck(this.truckName);
  }
}

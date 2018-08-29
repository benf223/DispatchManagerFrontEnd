import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {WebService} from '../web.service';
import {Change, TruckRounds} from '../interfaces';

@Component({
  selector: 'app-planning-truck-grid',
  templateUrl: './planning-truck-grid.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningTruckGridComponent implements OnInit {

  // Config for the table
  displayedColumns = ['truckID', 'dayRound1', 'dayRound2', 'dayRound3',
    'dayRound4', 'dayRound5', 'dayRound6', 'dayRound7', 'dayRound8'];
  dataSource;

  // State information for the day or night information to be displayed
  day = true;
  dayOrNight = 'Switch to: Night';

  // Paginator for the table
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Injects the WebService
  constructor(private webService: WebService) {}

  // Subscribes to the webservice for the round information.
  ngOnInit() {
    this.webService.rounds.subscribe(() => {
      this.setupDataSource(this.webService.daysRounds.rounds);
    });
  }

  // Listener for the day/night button
  updateTable() {
    if (this.day) {
      this.dayOrNight = 'Switch to: Day';
    } else {
      this.dayOrNight = 'Switch to: Night';
    }

    this.day = !this.day;
  }

  // Sets the tables data source
  private setupDataSource(rounds : TruckRounds[]) {
    this.dataSource = new MatTableDataSource(rounds);
    this.dataSource.paginator = this.paginator;
  }

  // Listener for events from truckslots to update the API
  pushData(change : Change) {
    this.webService.pushUpdateToAPI(change);
  }
}

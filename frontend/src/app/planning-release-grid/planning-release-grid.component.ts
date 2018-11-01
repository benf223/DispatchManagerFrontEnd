import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {WebService} from '../web.service';
import {DragHelperService} from '../drag-helper.service';
import {ReleaseInformationComponent} from '../release-information/release-information.component';
import {Release} from "../interfaces";

@Component({
  selector: 'app-planning-order-grid',
  templateUrl: './planning-release-grid.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningReleaseGridComponent implements OnInit {

  // Data to setup the table
  displayedColumns = ['release', 'qty', 'size'];
  dataSource;

  // Injects the WebService and DragHelperService and the dialog
  constructor(private webService: WebService, private dragHelperService: DragHelperService, public dialog: MatDialog) {}

  // Subscribes to the releases from the API
  ngOnInit() {
    this.webService.releases.subscribe(() => {
      this.setDataSource(this.webService.daysReleases);
    });
  }

  // Filters the release grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Data transmission for the drag and drop features
  setRelease(release: Release) {
    if (release.qty === 0) {
      return;
    }

    this.dragHelperService.onReleaseGrab(release);
  }

  // Sets the table data source
  private setDataSource(releases) {
    this.dataSource = new MatTableDataSource(releases);
    this.dataSource.filterPredicate = (data: Release, filter: string) => (data.release.indexOf(filter) !== -1);
  }

  // Opens the dialog with data for the clicked release
  openDialog(release: Release) {
    this.dialog.open(ReleaseInformationComponent, {
      width: '500px',
      height: '500px',
      data: release.release,
      panelClass: 'releasePopupClass'
    });
  }
}

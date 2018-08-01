import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {WebService} from '../web.service';
import {DragHelperService} from '../drag-helper.service';
import {ReleaseInformationComponent} from '../release-information/release-information.component';

@Component({
  selector: 'app-planning-order-grid',
  templateUrl: './planning-release-grid.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningReleaseGridComponent implements OnInit {

  // Data to setup the table
  displayedColumns = ['release', 'qty', 'size'];
  dataSource;

  // Injects the webservice and drag service.
  constructor(private webService: WebService, private dragHelperService: DragHelperService, public dialog: MatDialog) {}

  // Subscribes to the releases from the API
  ngOnInit() {
    this.webService.releases.subscribe(() => {
      this.setDataSource(this.webService.daysReleases);
    });

    // this.setDataSource(SAMPLE_RELEASES);
  }

  // Filters the release grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Data transmission for the drag and drop features
  setRelease(release: Release) {
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

// Interface for the Release the will be used on the website.
export interface Release {
  release: string;
  size: number;
  qty: number;
  colour: string;
}

// Sample data. Unused.
// const SAMPLE_RELEASES: Release[] = [
//   {release: '1', qty: 2, size: 40, colour: '#FF0000'},
//   {release: '2', qty: 4, size: 20, colour: '#FF0000'},
//   {release: '3', qty: 1, size: 40, colour: '#FFFF00'},
//   {release: '4', qty: 5, size: 20, colour: '#FFFF00'},
//   {release: '5', qty: 5, size: 20, colour: '#FFFF00'},
//   {release: '6', qty: 5, size: 20, colour: '#FFFF00'},
//   {release: '7', qty: 5, size: 20, colour: '#FF00FF'},
//   {release: '8', qty: 5, size: 20, colour: '#FF00FF'},
//   {release: '9', qty: 5, size: 20, colour: '#FF00FF'}
// ];

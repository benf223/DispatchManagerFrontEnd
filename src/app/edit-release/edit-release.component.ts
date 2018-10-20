import { Component, OnInit } from '@angular/core';
import {WebService} from "../services/web.service";
import {MatTableDataSource} from "@angular/material";
import {FullRelease, Release} from "../interfaces";

@Component({
  selector: 'app-edit-release',
  templateUrl: './edit-release.component.html',
  styleUrls: ['./edit-release.component.css']
})
export class EditReleaseComponent implements OnInit {

  // Data to setup the table
  displayedColumns = ['release', 'edit'];
  dataSource;
  showForm: boolean = false;
  release : FullRelease = null;

  // Inject the webservice
  constructor(private webService : WebService) { }

  // Retrieve the data and display it
  ngOnInit() {
    this.webService.getFullReleases();

    this.webService.fullReleases.subscribe((fullReleases) => {
      this.setDataSource(fullReleases);
    });
  }

  // Filters the release grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Sets the table data source
  private setDataSource(releases) {
    this.dataSource = new MatTableDataSource(releases);
    this.dataSource.filterPredicate = (data: Release, filter: string) => (data.release.indexOf(filter) !== -1);
  }

  // Shows the edit form for a selected release
  loadEditor(release)
  {
    this.release = release;
    this.showForm = true;
    console.log(release);
  }

  // Deletes the release corresponding to the releaseID from the database
  deleteRelease(release)
  {
    // Perhaps a prompt
    this.webService.deleteRelease(release);
  }
}

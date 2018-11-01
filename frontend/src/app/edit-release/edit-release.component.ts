import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";
import {MatTableDataSource} from "@angular/material";
import {FullRelease, Release} from "../interfaces";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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

  release : FullRelease = {release: null, colour: null, qtyForty: 0, qtyTwenty: 0};

  constructor(private webService : WebService) { }

  ngOnInit() {
    this.webService.getFullReleases();

    this.webService.fullReleases.subscribe(() => {
      this.setDataSource(this.webService.fullReleasesStore);
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

  loadEditor(release)
  {
    this.release = release;
    this.showForm = true;
    console.log(release);
  }
}

import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {WebService} from '../web.service';
import {DraghelperService} from '../draghelper.service';
import {ReleaseInformationComponent} from "../release-information/release-information.component";

@Component({
  selector: 'planningordergrid',
  templateUrl: './planning-release-grid.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningReleaseGrid implements OnInit {
  displayedColumns = ['release', 'qty', 'size'];
  dataSource;

  constructor(private webService: WebService, private draghelperService: DraghelperService, public dialog : MatDialog) {}

  ngOnInit() {
    this.webService.releases.subscribe(() => {
      this.setDataSource(this.webService.daysReleases);
    });

    // this.setDataSource(SAMPLE_RELEASES);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  emit(e) {
    console.log(e);
  }

  setRelease(release: Release) {
    this.draghelperService.onReleaseGrab(release);
  }

  private setDataSource(releases) {
    this.dataSource = new MatTableDataSource(releases);
    this.dataSource.filterPredicate = (data: Release, filter: string) => (data.release.indexOf(filter) != -1);
  }

  openDialog(release : Release)
  {
    const dialogRef = this.dialog.open(ReleaseInformationComponent, {
      width: '500px',
      height: '500px',
      data: release
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
}

export interface Release {
  release: string;
  size: number;
  qty: number;
  colour: string;
}

const SAMPLE_RELEASES: Release[] = [
  {release: '1', qty: 2, size: 40, colour: '#FF0000'},
  {release: '2', qty: 4, size: 20, colour: '#FF0000'},
  {release: '3', qty: 1, size: 40, colour: '#FFFF00'},
  {release: '4', qty: 5, size: 20, colour: '#FFFF00'},
  {release: '5', qty: 5, size: 20, colour: '#FFFF00'},
  {release: '6', qty: 5, size: 20, colour: '#FFFF00'},
  {release: '7', qty: 5, size: 20, colour: '#FF00FF'},
  {release: '8', qty: 5, size: 20, colour: '#FF00FF'},
  {release: '9', qty: 5, size: 20, colour: '#FF00FF'}
];

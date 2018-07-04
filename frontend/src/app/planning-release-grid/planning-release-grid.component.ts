import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'planningordergrid',
  templateUrl: './planning-release-grid.component.html',
  styleUrls: ['../app.component.css']
})
export class PlanningReleaseGrid {
  displayedColumns = ['release', 'qty', 'size'];
  dataSource = new MatTableDataSource(SAMPLE_RELEASES);

  ngOnInit()
  {
    this.dataSource.filterPredicate = (data: Release, filter : string) => (data.release.indexOf(filter) != -1);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  emit(e)
  {
    console.log(e)
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

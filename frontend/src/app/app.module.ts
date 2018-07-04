import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DraggableModule } from './draggable/draggable.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanningSelectorComponent } from './planning-selector/planning-selector.component';
import { PlanningReleaseGrid } from './planning-release-grid/planning-release-grid.component';
import { PlanningTruckGrid } from './planning-truck-grid/planning-truck-grid.component';
import { TruckRoundPlanner } from './truck-round-planner/truck-round-planner.component';
import { TruckSlotsComponent } from './truck-slots/truck-slots.component';

import { WebService } from './web.service';


let routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'planning',
    component: PlanningComponent
  },
  {
    //unused?
    path: 'planning/:date',
    component: PlanningComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PlanningComponent,
    PlanningSelectorComponent,
    PlanningReleaseGrid,
    PlanningTruckGrid,
    TruckRoundPlanner,
    TruckSlotsComponent,
    PlanningReleaseGrid,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    DraggableModule
  ],
  providers: [ WebService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}

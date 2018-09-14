import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { WebService } from './web.service';
import {HttpClientModule} from '@angular/common/http';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonToggleModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { LocationsComponent } from './locations/locations.component';
import { PlanningSelectorComponent } from './planning-selector/planning-selector.component';
import { PlanningReleaseGrid } from './planning-release-grid/planning-release-grid.component';
import { PlanningTruckGrid } from './planning-truck-grid/planning-truck-grid.component';
import { TruckRoundPlanner } from './truck-round-planner/truck-round-planner.component';
import { TruckSlotsComponent } from './truck-slots/truck-slots.component';
import { AddLocationComponent } from './add-location-information/add-location.component';
import { AddLocationInformation } from './add-location-information/add-location.component';
import { ViewLocationInformation } from './add-location-information/view-location-information.component';


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
  },
  {
    path: 'Locations',
    component: LocationsComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PlanningComponent,
	LocationsComponent,
    PlanningSelectorComponent,
    PlanningReleaseGrid,
    PlanningTruckGrid,
    TruckRoundPlanner,
    TruckSlotsComponent,
    PlanningReleaseGrid,
	AddLocationComponent,
	AddLocationInformation,
	ViewLocationInformation
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
	HttpClientModule,
	NgbModule.forRoot()
  ],
  providers: [ WebService,NgbActiveModal],
  bootstrap: [ AppComponent ],
  entryComponents: [AddLocationInformation,ViewLocationInformation],
})
export class AppModule {

}

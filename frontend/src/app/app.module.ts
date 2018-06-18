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
  MatPaginatorModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { PlanningComponent } from './planning.component';
import { PlanningSelectorComponent } from './planningSelector.component';
import { PlanningOrderGridComponent } from './planningOrderGrid.component';
import { PlanningTruckGridComponent } from './planningTruckGrid.component';
import { TruckRoundPlannerComponent } from './truckRoundPlanner.component';
import { TruckSlotComponent } from './truckSlot.component';

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
    PlanningOrderGridComponent,
    PlanningTruckGridComponent,
    TruckRoundPlannerComponent,
    TruckSlotComponent
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [ WebService ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

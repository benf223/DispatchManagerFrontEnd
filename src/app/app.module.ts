import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
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
  MatTooltipModule,
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WebService } from './web.service';

import { DraggableModule } from './draggable/draggable.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanningSelectorComponent } from './planning-selector/planning-selector.component';
import { PlanningReleaseGridComponent } from './planning-release-grid/planning-release-grid.component';
import { PlanningTruckGridComponent } from './planning-truck-grid/planning-truck-grid.component';
import { TruckRoundPlannerComponent } from './truck-round-planner/truck-round-planner.component';
import { TruckSlotsComponent } from './truck-slots/truck-slots.component';
import { ReleaseInformationComponent } from './release-information/release-information.component';
import { AddReleaseComponent } from './add-release/add-release.component';
import { EditReleaseComponent } from './edit-release/edit-release.component';
import { WarningPopupComponent } from './warning-popup/warning-popup.component';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'planning',
    component: PlanningComponent
  },
  {
    path: 'release/add',
    component: AddReleaseComponent
  },
  {
    path: 'release/edit',
    component: EditReleaseComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PlanningComponent,
    PlanningSelectorComponent,
    PlanningReleaseGridComponent,
    PlanningTruckGridComponent,
    TruckRoundPlannerComponent,
    TruckSlotsComponent,
    PlanningReleaseGridComponent,
    ReleaseInformationComponent,
    AddReleaseComponent,
    EditReleaseComponent,
    WarningPopupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    DraggableModule
  ],
  providers: [ WebService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ ReleaseInformationComponent, WarningPopupComponent ]
})
export class AppModule {

}

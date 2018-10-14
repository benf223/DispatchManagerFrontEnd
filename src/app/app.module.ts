import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule, MatSelectModule, MatOptionModule, MAT_DATE_LOCALE, MatChipsModule, MatIconModule
} from '@angular/material';

import { MccColorPickerModule } from "material-community-components";

import { WebService } from './services/web.service';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

import { DraggableModule } from './draggable/draggable.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanningSelectorComponent } from './planning-selector/planning-selector.component';
import { PlanningReleaseGridComponent } from './planning-release-grid/planning-release-grid.component';
import { PlanningTruckGridComponent } from './planning-truck-grid/planning-truck-grid.component';
import { TruckSlotsComponent } from './truck-slots/truck-slots.component';
import { ReleaseInformationComponent } from './release-information/release-information.component';
import { AddReleaseComponent } from './add-release/add-release.component';
import { EditReleaseComponent } from './edit-release/edit-release.component';
import { WarningPopupComponent } from './warning-popup/warning-popup.component';
import { EditReleaseFormComponent } from './edit-release-form/edit-release-form.component';
import { AdministrationComponent } from './administration/administration.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AlertComponent } from './alert/alert.component';

import { AuthGuard } from "./auth.guard";
import { JwtInterceptor } from './jwt.interceptor';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'release/add',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'release/edit',
    component: EditReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
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
    TruckSlotsComponent,
    PlanningReleaseGridComponent,
    ReleaseInformationComponent,
    AddReleaseComponent,
    EditReleaseComponent,
    WarningPopupComponent,
    EditReleaseFormComponent,
    AdministrationComponent,
    LoginComponent,
    CreateUserComponent,
    AlertComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatIconModule,
    MccColorPickerModule.forRoot({
      empty_color: '#FFFFFF'
    }),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    DraggableModule,
  ],
  providers: [ WebService, AuthService, AuthGuard, AlertService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'} ],
  bootstrap: [ AppComponent ],
  entryComponents: [ ReleaseInformationComponent, WarningPopupComponent ]
})
export class AppModule {

}

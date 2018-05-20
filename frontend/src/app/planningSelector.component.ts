import { Component } from '@angular/core';

@Component({
  selector: 'planningselector',
  template: `
    <mat-toolbar color="accent">
      <!--perhaps not routerlinks but similar in function to the click-->
      <button mat-button (click)="previousWeek()">Previous Week</button>
      <button mat-button (click)="loadDay(monday)">Mon: {{monday}}</button>
      <button mat-button (click)="loadDay(tuesday)">Tue: {{tuesday}}</button>
      <button mat-button (click)="loadDay(wednesday)">Wed: {{wednesday}}</button>
      <button mat-button (click)="loadDay(thursday)">Thu: {{thursday}}</button>
      <button mat-button (click)="loadDay(friday)">Fri: {{friday}}</button>
      <button mat-button (click)="loadDay(saturday)">Sat: {{saturday}}</button>
      <button mat-button (click)="loadDay(sunday)">Sun: {{sunday}}</button>
      <button mat-button (click)="nextWeek()">Next Week</button>
    </mat-toolbar>
  `,
  styleUrls: ['./app.component.css']
})
export class PlanningSelectorComponent {
  monday;
  tuesday;
  wednesday;
  thursday;
  friday;
  saturday;
  sunday;

  loadDay(day)
  {
    console.log(day);
    day = day.split('/');

    let selected = new Date(new Date().getFullYear(), Number(day[1]) - 1, Number(day[0]));

    console.log(selected);
  }

  previousWeek()
  {
    console.log('going backward');
  }

  nextWeek()
  {
    console.log('going forward');
  }

  ngOnInit()
  {
    let currentDate = new Date();

    //if today is wednesday, then mon and tue should be prior to the current wednesday
    //eg if today wed = 22/5 the mon=20/5 tue=21/5
    switch(currentDate.getDay())
    {
      case 0:
      {
        //Sunday
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
      case 1:
      {
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
      case 2:
      {
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
      case 3:
      {
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
      case 4:
      {
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
      case 5:
      {
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
      case 6:
      {
        this.saturday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.sunday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.monday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.tuesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.wednesday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.thursday = currentDate.toLocaleString('en-GB').substring(0, 5);
        currentDate.setDate(currentDate.getDate() + 1);
        this.friday = currentDate.toLocaleString('en-GB').substring(0, 5);

        break;
      }
    }
  }
}

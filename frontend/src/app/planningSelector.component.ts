import { Component } from '@angular/core';

@Component({
  selector: 'planningselector',
  template: `
    <mat-toolbar color="accent">
      <span style="flex: 1 1 auto"></span>
      <!--perhaps not routerlinks but similar in function to the click-->
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="previousWeek()">Previous Week</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(monday)" [disabled]="monday.disabled">Mon: {{monday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(tuesday)" [disabled]="tuesday.disabled">Tue: {{tuesday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(wednesday)" [disabled]="wednesday.disabled">Wed: {{wednesday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(thursday)" [disabled]="thursday.disabled">Thu: {{thursday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(friday)" [disabled]="friday.disabled">Fri: {{friday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(saturday)" [disabled]="saturday.disabled">Sat: {{saturday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="loadDay(sunday)" [disabled]="sunday.disabled">Sun: {{sunday.day}}</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="nextWeek()">Next Week</button>
      <button mat-raised-button style="margin: 5px; text-align: center" (click)="ngOnInit()">Today</button>
      <span style="flex: 1 1 auto"></span>
    </mat-toolbar>
  `,
  styleUrls: ['./app.component.css']
})
export class PlanningSelectorComponent {
  monday = { day: '', disabled: false };
  tuesday = { day: '', disabled: false };
  wednesday = { day: '', disabled: false };
  thursday = { day: '', disabled: false };
  friday = { day: '', disabled: false };
  saturday = { day: '', disabled: false };
  sunday = { day: '', disabled: false };

  selectedDay;

  //need to accomodate year
  loadDay(day)
  {
    console.log(day.day);

    let selected = this.getDateFromString(day.day);

    this.selectedDay.disabled = false;
    day.disabled = true;
    this.selectedDay = day;

    console.log('Change to', selected);
  }

  //working
  getDateFromString(string)
  {
    let dayString = string.split('/');
    return new Date(new Date().getFullYear(), Number(dayString[1]) - 1, Number(dayString[0]));
  }

  //need to set new day to monday
  previousWeek()
  {
    this.selectedDay.disabled = false;

    let prevMonday = this.getDateFromString(this.monday.day);

    prevMonday.setDate(prevMonday.getDate() - 7);

    this.setDays(prevMonday);
    console.log(this.sunday);
  }

  //finished
  nextWeek()
  {
    this.selectedDay.disabled = false;

    let nextMonday = this.getDateFromString(this.monday.day);

    nextMonday.setDate(nextMonday.getDate() + 7);

    this.setDays(nextMonday);
  }

  setDays(day)
  {
    switch (day.getDay())
    {
      case 0:
        this.sunday.disabled = true;
        this.selectedDay = this.sunday;
        break;
      case 1:
        this.monday.disabled = true;
        this.selectedDay = this.monday;
        break;
      case 2:
        this.tuesday.disabled = true;
        this.selectedDay = this.tuesday;
        break;
      case 3:
        this.wednesday.disabled = true;
        this.selectedDay = this.wednesday;
        break;
      case 4:
        this.thursday.disabled = true;
        this.selectedDay = this.thursday;
        break;
      case 5:
        this.friday.disabled = true;
        this.selectedDay = this.friday;
        break;
      case 6:
        this.saturday.disabled = true;
        this.selectedDay = this.saturday;
        break;
    }

    let start = day.getDay() == 0 ? -6 : (day.getDay() * -1) + 1;
    day.setDate(day.getDate() + start);

    this.monday.day = day.toLocaleString('en-GB').substring(0, 5);
    day.setDate(day.getDate() + 1);
    this.tuesday.day = day.toLocaleString('en-GB').substring(0, 5);
    day.setDate(day.getDate() + 1);
    this.wednesday.day = day.toLocaleString('en-GB').substring(0, 5);
    day.setDate(day.getDate() + 1);
    this.thursday.day = day.toLocaleString('en-GB').substring(0, 5);
    day.setDate(day.getDate() + 1);
    this.friday.day = day.toLocaleString('en-GB').substring(0, 5);
    day.setDate(day.getDate() + 1);
    this.saturday.day = day.toLocaleString('en-GB').substring(0, 5);
    day.setDate(day.getDate() + 1);
    this.sunday.day = day.toLocaleString('en-GB').substring(0, 5);

  }

  ngOnInit()
  {
    if (this.selectedDay)
    {
      this.selectedDay.disabled = false;
    }

    let currentDate = new Date();

    this.setDays(currentDate);
  }
}

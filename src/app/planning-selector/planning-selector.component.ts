import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'planningselector',
  templateUrl: './planning-selector.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningSelectorComponent implements OnInit {
  monday = { day: '', disabled: false };
  tuesday = { day: '', disabled: false };
  wednesday = { day: '', disabled: false };
  thursday = { day: '', disabled: false };
  friday = { day: '', disabled: false };
  saturday = { day: '', disabled: false };
  sunday = { day: '', disabled: false };

  selectedDay;

  //need to accomodate year
  loadDay(day) {
    const selected = this.getDateFromString(day.day);

    this.selectedDay.disabled = false;
    day.disabled = true;
    this.selectedDay = day;
  }

  //working
  getDateFromString(string) {
    const dayString = string.split('/');
    return new Date(new Date().getFullYear(), Number(dayString[1]) - 1, Number(dayString[0]));
  }

  //need to set new day to monday
  previousWeek() {
    this.selectedDay.disabled = false;

    const prevMonday = this.getDateFromString(this.monday.day);

    prevMonday.setDate(prevMonday.getDate() - 7);

    this.setDays(prevMonday);
  }

  //finished
  nextWeek() {
    this.selectedDay.disabled = false;

    const nextMonday = this.getDateFromString(this.monday.day);

    nextMonday.setDate(nextMonday.getDate() + 7);

    this.setDays(nextMonday);
  }

  setDays(day) {
    switch (day.getDay()) {
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

    const start = day.getDay() == 0 ? -6 : (day.getDay() * -1) + 1;
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

  ngOnInit() {
    if (this.selectedDay) {
      this.selectedDay.disabled = false;
    }

    const currentDate = new Date();

    this.setDays(currentDate);
  }
}

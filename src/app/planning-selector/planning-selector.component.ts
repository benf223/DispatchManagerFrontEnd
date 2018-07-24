import {Component, EventEmitter, OnInit, Output} from '@angular/core';

interface Day
{
  day: string;
  disabled: boolean;
}

//Can we make this component cleaner
@Component({
  selector: 'planningselector',
  templateUrl: './planning-selector.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningSelectorComponent implements OnInit {

  monday : Day = {day: '', disabled: false};
  tuesday : Day = {day: '', disabled: false};
  wednesday : Day = {day: '', disabled: false};
  thursday : Day = {day: '', disabled: false};
  friday : Day = {day: '', disabled: false};
  saturday : Day = {day: '', disabled: false};
  sunday : Day = {day: '', disabled: false};

  selectedDay : Day;

  //need to update this so that the new date is emitted when needed to change the releases
  @Output() date = new EventEmitter<string>();

  //click listener
  loadDay(day : Day) {
    this.selectedDay.disabled = false;
    day.disabled = true;
    this.selectedDay = day;
    console.log(this.selectedDay.day.split('/').join('-'));
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  getDateFromString(dateString) {
    const dayString = dateString.split('/');
    return new Date(new Date().getFullYear(), Number(dayString[1]) - 1, Number(dayString[0]));
  }

  previousWeek() {
    this.selectedDay.disabled = false;

    const prevMonday = this.getDateFromString(this.monday.day);

    prevMonday.setDate(prevMonday.getDate() - 7);

    this.setDays(prevMonday);
    console.log(this.selectedDay.day.split('/').join('-'));
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  nextWeek() {
    this.selectedDay.disabled = false;

    const nextMonday = this.getDateFromString(this.monday.day);

    nextMonday.setDate(nextMonday.getDate() + 7);

    this.setDays(nextMonday);
    console.log(this.selectedDay.day.split('/').join('-'));
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  setDays(day : Date) {
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

    this.monday.day = day.toLocaleString(this.locale).substring(0, 10);
    day.setDate(day.getDate() + 1);
    this.tuesday.day = day.toLocaleString(this.locale).substring(0, 10);
    day.setDate(day.getDate() + 1);
    this.wednesday.day = day.toLocaleString(this.locale).substring(0, 10);
    day.setDate(day.getDate() + 1);
    this.thursday.day = day.toLocaleString(this.locale).substring(0, 10);
    day.setDate(day.getDate() + 1);
    this.friday.day = day.toLocaleString(this.locale).substring(0, 10);
    day.setDate(day.getDate() + 1);
    this.saturday.day = day.toLocaleString(this.locale).substring(0, 10);
    day.setDate(day.getDate() + 1);
    this.sunday.day = day.toLocaleString(this.locale).substring(0, 10);
  }

  ngOnInit() {
    if (this.selectedDay) {
      this.selectedDay.disabled = false;
    }

    const currentDate = new Date();

    this.setDays(currentDate);
    console.log(this.selectedDay.day.split('/').join('-'));
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  private locale = 'en-GB';
}

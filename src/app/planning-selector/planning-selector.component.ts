import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Day} from '../interfaces';

@Component({
  selector: 'app-planning-selector',
  templateUrl: './planning-selector.component.html',
  styleUrls: ['../app.component.scss']
})
export class PlanningSelectorComponent implements OnInit {

  // Two-way binding for the date buttons
  monday: Day = {day: '', disabled: false};
  tuesday: Day = {day: '', disabled: false};
  wednesday: Day = {day: '', disabled: false};
  thursday: Day = {day: '', disabled: false};
  friday: Day = {day: '', disabled: false};
  saturday: Day = {day: '', disabled: false};
  sunday: Day = {day: '', disabled: false};

  // The current day
  selectedDay: Day;

  // Output of the date to elements when it changes.
  @Output() date = new EventEmitter<string>();

  // Locale for date and time.
  private locale = 'en-GB';

  // Updates the day so that the correct information can be displayed. Emits the date
  loadDay(day: Day) {
    this.selectedDay.disabled = false;
    day.disabled = true;
    this.selectedDay = day;
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  // Converts a date string into a Date object.
  getDateFromString(dateString) {
    const dayString = dateString.split('/');
    return new Date(new Date().getFullYear(), Number(dayString[1]) - 1, Number(dayString[0]));
  }

  // Listener for the previous week button
  previousWeek() {
    this.selectedDay.disabled = false;

    const prevMonday = this.getDateFromString(this.monday.day);

    prevMonday.setDate(prevMonday.getDate() - 7);

    this.setDays(prevMonday);
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  // Listener for next week button
  nextWeek() {
    this.selectedDay.disabled = false;

    const nextMonday = this.getDateFromString(this.monday.day);

    nextMonday.setDate(nextMonday.getDate() + 7);

    this.setDays(nextMonday);
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }

  // Logic for changing the week being shown
  setDays(day: Date) {
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

    const start = day.getDay() === 0 ? -6 : (day.getDay() * -1) + 1;
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

  // Sets the display to the current day
  ngOnInit() {
    if (this.selectedDay) {
      this.selectedDay.disabled = false;
    }

    const currentDate = new Date();

    this.setDays(currentDate);
    this.date.emit(this.selectedDay.day.split('/').join('-'));
  }
}

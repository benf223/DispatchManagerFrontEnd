import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Rounds} from './planning-truck-grid/planning-truck-grid.component';
import {Release} from './planning-release-grid/planning-release-grid.component';

const SERVER_URL = 'http://localhost:62176/';

@Injectable()
export class WebService {

  private messageStore = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  daysRounds: Rounds[] = [];
  private roundsSubject = new Subject();
  rounds = this.roundsSubject.asObservable();

  daysReleases: Release[] = [];
  private releasesSubject = new Subject();
  releases = this.releasesSubject.asObservable();

  constructor(private http: Http) {}

  getMessages() {
    this.http.get(SERVER_URL + 'test').subscribe(response => {
      this.messageStore = response.json();
      this.messageSubject.next(this.messageStore);
    });
  }

  // customise this so that it will retrieve the rounds for the current day (day and night)
  getRounds(day) {
    this.http.get(SERVER_URL + 'api/rounds/' + day).subscribe(res => {
      this.daysRounds = res.json().rounds;
      this.roundsSubject.next(this.daysRounds);
    });
  }

  // customise this so that it will retrieve the releases relevant for the current day
  getReleases(day) {
    this.http.get(SERVER_URL + 'api/releases/' + day).subscribe(res => {
      this.daysReleases = res.json().releases;
      this.releasesSubject.next(this.daysReleases);

    });
  }
}

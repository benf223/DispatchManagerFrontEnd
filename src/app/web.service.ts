import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Rounds} from './planning-truck-grid/planning-truck-grid.component';
import {Release} from './planning-release-grid/planning-release-grid.component';
import {FullRelease} from './release-information/release-information.component';

const SERVER_URL = 'http://localhost:62176/';

@Injectable()
export class WebService {

  private messageStore;
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  daysRounds: Rounds[] = [];
  private roundsSubject = new Subject();
  rounds = this.roundsSubject.asObservable();

  daysReleases: Release[] = [];
  private releasesSubject = new Subject();
  releases = this.releasesSubject.asObservable();

  private currentDay: string;

  fullReleaseStore: FullRelease;
  private fullReleaseSubject = new Subject();
  fullRelease = this.fullReleaseSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  setCurrentDay(day: string) {
    this.currentDay = day;
  }

  getMessages() {
    this.httpClient.get<string>(SERVER_URL + 'test').subscribe(res => {
      console.log(res);
      this.messageStore = res;
      this.messageSubject.next(this.messageStore);
    });
  }

  // customise this so that it will retrieve the rounds for the current day (day and night)
  getRounds(day) {
    this.httpClient.get<Test>(SERVER_URL + 'api/rounds/' + day).subscribe(res => {
      this.daysRounds = res.rounds;
      this.roundsSubject.next(this.daysRounds);
    });
  }

  // customise this so that it will retrieve the releases relevant for the current day
  getReleases(day) {
    this.httpClient.get<Test2>(SERVER_URL + 'api/releases/' + day).subscribe(res => {
      this.daysReleases = res.releases;
      this.releasesSubject.next(this.daysReleases);
    });
  }

  getFullRelease(releaseID: string) {
    this.httpClient.get<FullRelease>(SERVER_URL + 'api/full_releases/' + this.currentDay + '@' + releaseID).subscribe(res => {
      this.fullReleaseStore = res;
      this.fullReleaseSubject.next(this.fullReleaseStore);
    });
  }
}

export interface Test {
  rounds: Rounds[];
}

export interface Test2 {
  releases: Release[];
}

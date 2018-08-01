import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Rounds} from './planning-truck-grid/planning-truck-grid.component';
import {Release} from './planning-release-grid/planning-release-grid.component';
import {FullRelease} from './release-information/release-information.component';

// Constant that defines where the REST API is located
const SERVER_URL = 'http://localhost:3000/';

@Injectable()
export class WebService {

  // Stores the current loaded day on the planning page
  private currentDay: string;

  // Dummy observable and subject for testing purposes
  private messageStore;
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  // Observable and subject for Rounds
  daysRounds: Rounds[] = [];
  private roundsSubject = new Subject();
  rounds = this.roundsSubject.asObservable();

  // Observable and subject for Releases
  daysReleases: Release[] = [];
  private releasesSubject = new Subject();
  releases = this.releasesSubject.asObservable();

  // Observable and subject for the full release data used in the release popups
  fullReleaseStore: FullRelease;
  private fullReleaseSubject = new Subject();
  fullRelease = this.fullReleaseSubject.asObservable();

  // Inject the HTTPClient functionality
  constructor(private httpClient: HttpClient) {}

  // Setter for the current day
  setCurrentDay(day: string) {
    this.currentDay = day;
  }

  // Dummy method for the test observable
  getMessages() {
    this.httpClient.get<string>(SERVER_URL + 'test').subscribe(res => {
      this.messageStore = res;
      this.messageSubject.next(this.messageStore);
    });
  }

  // Method that will retrieve and emit to the subscribers the rounds for a given day
  getRounds(day) {
    this.httpClient.get<Test>(SERVER_URL + 'api/rounds/' + day).subscribe(res => {
      this.daysRounds = res.rounds;
      this.roundsSubject.next(this.daysRounds);
    });
  }

  // Method that will retrieve and emit to the subscribers the releases for a given day
  getReleases(day) {
    this.httpClient.get<Test2>(SERVER_URL + 'api/releases/' + day).subscribe(res => {
      this.daysReleases = res.releases;
      this.releasesSubject.next(this.daysReleases);
    });
  }

  // Method that will retrieve and emit to the subscribers the full releases for a given day
  getFullRelease(releaseID: string) {
    this.httpClient.get<FullRelease>(SERVER_URL + 'api/full_releases/' + this.currentDay + '@' + releaseID).subscribe(res => {
      this.fullReleaseStore = res;
      this.fullReleaseSubject.next(this.fullReleaseStore);
    });
  }
}

// Bad interface to enable typing for the return type of the the httpClient (remove)
export interface Test {
  rounds: Rounds[];
}

// Bad interface to enable typing for the return type of the the httpClient (remove)
export interface Test2 {
  releases: Release[];
}

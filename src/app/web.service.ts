import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FullRelease, Release, TruckRounds, Trucks} from './interfaces';

// Constant that defines where the REST API is located
const SERVER_URL = 'https://demo-recur-api.herokuapp.com/api';

@Injectable()
export class WebService {

  // Stores the current loaded day on the planning page
  private currentDay: string;

  // Observable and subject for Rounds
  daysRounds : Trucks = {rounds: []};
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

  // Empty Method that will spin up the REST API
  spinUpAPI() {
    this.httpClient.get<string>(SERVER_URL + '/start').subscribe(() => {
    });
  }

  // Method that will retrieve and emit to the subscribers the rounds for a given day
  getRounds(day) {
    this.httpClient.get<TruckRounds[]>(SERVER_URL + '/rounds/' + day).subscribe((res) => {
      this.daysRounds.rounds = res;
      this.roundsSubject.next(this.daysRounds.rounds);
    });
  }

  // Method that will retrieve and emit to the subscribers the releases for a given day
  getReleases(day) {
    this.httpClient.get<Release[]>(SERVER_URL + '/releases/' + day).subscribe(res => {
      console.log(res);
      this.daysReleases = res;
      this.releasesSubject.next(this.daysReleases);
    });
  }

  // Method that will retrieve and emit to the subscribers the full releases for a given day
  getFullRelease(releaseID: string) {
    this.httpClient.get<FullRelease>(SERVER_URL + '/full_releases/' + this.currentDay + '@' + releaseID).subscribe(res => {
      this.fullReleaseStore = res;
      this.fullReleaseSubject.next(this.fullReleaseStore);
    });
  }

  // Method that will find the truck that has been updated and will update the API via POST
  pushUpdateToAPI(truckID) {
    console.log(this.daysRounds);
    // this.httpClient.post(SERVER_URL + '/', {id: truckID, dayRounds: this.daysRounds});
  }
}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Change, FullRelease, Release, TruckRounds, Trucks} from './interfaces';

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

  // Observable and subject for all the full release data used in the edit release popups
  fullReleasesStore: FullRelease[];
  private fullReleasesSubject = new Subject();
  fullReleases = this.fullReleasesSubject.asObservable();

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

  getFullReleases()
  {
    this.httpClient.get<FullRelease[]>(SERVER_URL + '/full_releases/').subscribe(res => {
      this.fullReleasesStore = res;
      this.fullReleasesSubject.next(this.fullReleasesStore);
    })
  }

  // Method that will find the truck and releases that have been updated and will update the API via POST
  pushUpdateToAPI(change : Change) {
    console.log(change);

    let client = this.httpClient;

    this.daysRounds.rounds.forEach(function (round : TruckRounds)
    {
      if (round.id === change.truckID)
      {
        client.post(SERVER_URL + '/update_rounds/', round).subscribe(() => {
        });
      }
    });

    // also need to update the releases
    client.post(SERVER_URL + '/update_release/', change).subscribe(() => {
      // Should update the releases
      this.getReleases(this.currentDay);
    });
  }

  // is this data correct
  addRelease(data : FullRelease) {
    this.httpClient.post(SERVER_URL + '/add_release/', data);
  }

  deleteRelease(releaseID) {
    this.httpClient.delete(SERVER_URL + '/delete_release/' + releaseID);
  }


}

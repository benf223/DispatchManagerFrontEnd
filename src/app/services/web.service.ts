import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Change, FullRelease, Release, TruckRounds, Trucks} from '../interfaces';

// Constant that defines where the REST API is located
const SERVER_URL = 'http://localhost:3000/api';

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

  // Empty method that starts the REST API if it is halted
  spinUpAPI() {
    this.httpClient.get<string>(SERVER_URL + '/start').subscribe(() => {
    });
  }

  // Method that retrieves and emits to the subscribers the rounds for a given day
  getRounds(day) {
    this.httpClient.get<TruckRounds[]>(SERVER_URL + '/rounds/' + day).subscribe((res) => {
      this.daysRounds.rounds = res;
      this.roundsSubject.next(this.daysRounds.rounds);
    });
  }

  // Method that retrieves and emits to the subscribers the releases for a given day
  getReleases(day) {
    this.httpClient.get<Release[]>(SERVER_URL + '/releases/' + day).subscribe(res => {
      this.daysReleases = res;
      this.releasesSubject.next(this.daysReleases);
    });
  }

  // Method that retrieves and emits to the subscribers a full release given an ID
  getFullRelease(releaseID: string) {
    this.httpClient.get<FullRelease>(SERVER_URL + '/full_releases/' + this.currentDay + '@' + releaseID).subscribe(res => {
      this.fullReleaseStore = res;
      this.fullReleaseSubject.next(this.fullReleaseStore);
    });
  }

  // Method that retrieves all the full releases from the API and emits to the subscribers
  getFullReleases()
  {
    this.httpClient.get<FullRelease[]>(SERVER_URL + '/full_releases/').subscribe(res => {
      this.fullReleasesStore = res;
      this.fullReleasesSubject.next(this.fullReleasesStore);
    })
  }

  // Method that finds the truck and releases that have been updated and updates the backend
  pushUpdateToAPI(change : Change) {
    console.log(change);

    let client = this.httpClient;
    let roundsUrl = SERVER_URL + '/update_rounds/' + this.currentDay;
    this.daysRounds.rounds.forEach(function (round : TruckRounds)
    {
      if (round.id === change.truckID)
      {
        // Send the day
        client.post(roundsUrl, round).subscribe(() => {
        });
      }
    });

    client.post(SERVER_URL + '/update_release/', change).subscribe(() => {
      // Should update the releases
      this.getReleases(this.currentDay);
    });
  }

  // Posts a newly created release to the backend
  addRelease(data : FullRelease) {
    this.httpClient.post(SERVER_URL + '/add_release/', data);
  }

  // Deletes a release corresponding to the given ID from the backend
  deleteRelease(releaseID) {
    this.httpClient.delete(SERVER_URL + '/delete_release/' + releaseID);
  }

  // Adds a new truck to the backend
  addTruck(truckName: String)
  {
    this.httpClient.post(SERVER_URL + '/add_truck', {truckName: truckName}).subscribe(() => {
      // if successful need to update the webservice.
    })
  }
}

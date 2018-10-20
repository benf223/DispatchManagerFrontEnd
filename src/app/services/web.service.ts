import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Change, FullRelease, Release, TruckRounds, Trucks} from '../interfaces';
import {environment} from '../../environments/environment';

@Injectable()
export class WebService {

  // Stores the current loaded day on the planning page
  private currentDay: string;

  // Observable and subject for Rounds
  private daysRounds : Trucks;
  private roundsSubject = new Subject<Trucks>();
  rounds = this.roundsSubject.asObservable();

  // Observable and subject for Releases
  private daysReleases: Release[] = [];
  private releasesSubject = new Subject<Release[]>();
  releases = this.releasesSubject.asObservable();

  // Observable and subject for the full release data used in the release popups
  private fullReleaseStore: FullRelease;
  private fullReleaseSubject = new Subject<FullRelease>();
  fullRelease = this.fullReleaseSubject.asObservable();

  // Observable and subject for all the full release data used in the edit release popups
  private fullReleasesStore: FullRelease[];
  private fullReleasesSubject = new Subject<FullRelease[]>();
  fullReleases = this.fullReleasesSubject.asObservable();

  // Inject the HTTPClient functionality
  constructor(private httpClient: HttpClient) {
  }

  // Setter for the current day
  setCurrentDay(day: string) {
    this.currentDay = day;
  }

  // Empty method that starts the REST API if it is halted
  spinUpAPI() {
      this.httpClient.get<string>(environment.apiURL + '/start').subscribe(() => {
      });
  }

  // Method that retrieves and emits to the subscribers the rounds for a given day
  getRounds(day) {
    this.httpClient.get<TruckRounds[]>(environment.apiURL + '/rounds/' + day).subscribe((res) => {
      this.daysRounds.rounds = res;
      this.roundsSubject.next(this.daysRounds);
      
    });
  }

  // Method that retrieves and emits to the subscribers the releases for a given day
  getReleases(day) {
    this.httpClient.get<Release[]>(environment.apiURL + '/releases/' + day).subscribe(res => {
      this.daysReleases = res;
      this.releasesSubject.next(this.daysReleases);
    });
  }

  // Method that retrieves and emits to the subscribers a full release given an ID
  getFullRelease(releaseID: string) {
    this.httpClient.get<FullRelease>(environment.apiURL + '/full_releases/' + this.currentDay + '@' + releaseID).subscribe(res => {
      this.fullReleaseStore = res;
      this.fullReleaseSubject.next(this.fullReleaseStore);
    });
  }

  // Method that retrieves all the full releases from the API and emits to the subscribers
  getFullReleases()
  {
    this.httpClient.get<FullRelease[]>(environment.apiURL + '/full_releases/').subscribe(res => {
      this.fullReleasesStore = res;
      this.fullReleasesSubject.next(this.fullReleasesStore);
    })
  }

  // Method that finds the truck and releases that have been updated and updates the backend
  pushUpdateToAPI(change : Change) {
    console.log(change);

    let client = this.httpClient;
    let roundsUrl = environment.apiURL + '/update_rounds/' + this.currentDay;
    this.daysRounds.rounds.forEach(function (round : TruckRounds)
    {
      if (round.id === change.truckID)
      {
        // Send the day
        client.post(roundsUrl, round).subscribe(() => {
        });
      }
    });

    client.post(environment.apiURL + '/update_release/', change).subscribe(() => {
      // Should update the releases
      this.getReleases(this.currentDay);
    });
  }

  // Posts a newly created release to the backend
  addRelease(data : FullRelease) {
    console.log(data);
    // this.httpClient.post(environment.apiURL + '/add_release/', data);
  }

  // Deletes a release corresponding to the given ID from the backend
  deleteRelease(releaseID) {
    this.httpClient.delete(environment.apiURL + '/delete_release/' + releaseID);
  }

  // Adds a new truck to the backend
  addTruck(truckName: String)
  {
    this.httpClient.post(environment.apiURL + '/add_truck', {truckName: truckName}).subscribe(() => {
      // if successful need to update the webservice.
    })
  }

  // Listener for polling the API every 5s
  update() {
    if (localStorage.getItem('currentUser'))
    {
      this.getRounds(this.currentDay);
      this.getReleases(this.currentDay);
    }

  }
}

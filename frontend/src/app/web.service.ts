import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LOCATIONS} from './add-location-information/location-list'
import {Location} from './add-location-information/location'

// Constant that defines where the REST API is located
const SERVER_URL = 'https://recur-app-peter.herokuapp.com';

@Injectable()
export class WebService {

  // Stores the current loaded day on the planning page
  private currentDay: string;
  locationstore: LOCATIONS={locations: []};
  
  // Inject the HTTPClient functionality
  constructor(private httpClient: HttpClient) {}

  // Setter for the current day
  setCurrentDay(day: string) {
    this.currentDay = day;
  }
	
	spinUpAPI() {
    this.httpClient.get<string>(SERVER_URL + '/start').subscribe(() => {
    });
  }
  // Method that will retrieve and emit to the subscribers the rounds for a given day
  /*
  getRounds(day) {
    this.httpClient.get<TruckRounds[]>(SERVER_URL + '/rounds/' + day).subscribe((res) => {
      this.daysRounds.rounds = res;
      this.roundsSubject.next(this.daysRounds.rounds);
    });
  }*/

  //Method that will  retrieve and emit to the subscribers all location information 
  getLocation(){
	  this.httpClient.get<Location[]>(SERVER_URL + 'Alllocations').subscribe((res)=>{
		 console.log(res);
		 this.locationstore.locations = res;
	  });
  }
  //Method that will add new location to the database 
  addLocation(data: Location){
	  this.httpClient.post(SERVER_URL + 'add_location',data);
	  
  }
  
  deleteLocation(name:Location){
	this.httpClient.post(SERVER_URL+'delete_location',name);
  }
  
  updateLocation(name:Location){
	this.httpClient.post(SERVER_URL+'update_location',name);
  }
}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Constant that defines where the REST API is located
const SERVER_URL = 'https://demo-recur-api.herokuapp.com/auth';

@Injectable()
export class AuthService {

  private loggedIn : boolean = false;

  // Inject the HttpClient (rather than using WebService)
  constructor(private httpClient : HttpClient) { }

  // Will be used to register a user on the back end
  register(user) {
    this.httpClient.post(SERVER_URL + '/register', user).subscribe((res) => {
      console.log(res);
    });
  }

  // Send login data and get a token back
  login() {
    // this.httpClient

    this.loggedIn = true;
    // Is this correct?
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }
}

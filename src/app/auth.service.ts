import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Constant that defines where the REST API is located
const SERVER_URL = 'http://localhost:3000/auth';

@Injectable()
export class AuthService {

  // Inject the HttpClient (rather than using WebService)
  constructor(private httpClient : HttpClient) { }

  // Will be used to register a user on the back end
  register(user) {
    this.httpClient.post(SERVER_URL + '/register', user).subscribe((res) => {
      console.log(res);
    });
  }
}

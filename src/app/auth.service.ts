import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";
import {User} from "./interfaces";

// Constant that defines where the REST API is located
const SERVER_URL = 'http://localhost:3000/auth';

@Injectable()
export class AuthService {

  private subject = new Subject<User>();
  values = this.subject.asObservable();

  // Inject the HttpClient (rather than using WebService)
  constructor(private httpClient : HttpClient) { }

  // Will be used to register a username on the back end
  register(user) {
    this.httpClient.post<any>(SERVER_URL + '/register', user).subscribe((res) => {
      console.log(res);

      this.subject.next(res);
    });
  }

  // Send login data and get a token back
  login(username : String, password : String) {
    this.httpClient.post<any>(SERVER_URL + '/login', { username: username, password: password}).subscribe((res) => {
      let user = res;

      if (user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      this.subject.next(user);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";
import {User} from "../interfaces";

// Constant that defines where the REST API is located
const SERVER_URL = 'http://localhost:3000/auth';

@Injectable()
export class AuthService {

  // Observable and subject for notifying the app about changes to users
  private subject = new Subject<User>();
  values = this.subject.asObservable();

  // Inject the HttpClient (rather than using WebService)
  constructor(private httpClient : HttpClient) { }

  // Attempts to create a user by registering it with the backend
  register(user) {
    this.httpClient.post<any>(SERVER_URL + '/register', user).subscribe((res) => {
      console.log(res);

      this.subject.next(res);
    });
  }

  // Send login data to the backend and gets a token back if successful
  login(username : String, password : String) {
    this.httpClient.post<any>(SERVER_URL + '/login', { username: username, password: password}).subscribe((res) => {
      let user = res;

      if (user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      this.subject.next(user);
    });
  }

  // Clears the users token from local storage to log them out
  logout() {
    localStorage.removeItem('currentUser');
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";
import {User} from "../interfaces";
import {environment} from '../../environments/environment';
import {AlertService} from './alert.service';

@Injectable()
export class AuthService {

  // Observable and subject for notifying the app about changes to users
  private subject = new Subject<any>();
  values = this.subject.asObservable();

  // Inject the HttpClient (rather than using WebService)
  constructor(private httpClient : HttpClient, private alertService : AlertService) { }

  // Attempts to create a user by registering it with the backend
  register(user) {
    this.httpClient.post<any>(environment.authURL + '/register', user).subscribe((res) => {
      console.log(res);

      this.subject.next(res);
    });
  }

  // Send login data to the backend and gets a token back if successful
  login(username : String, password : String) {
    this.httpClient.post<any>(environment.authURL + '/login', { username: username, password: password}).subscribe((res) => {
      let user = res;

      if (user) {
        if (user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.subject.next(user);
        }
      } else {
        this.alertService.error('Error logging in');
      }
    }, (error) => {
      this.alertService.error('Error logging in');
    });
  }

  // Clears the users token from local storage to log them out
  logout() {
    localStorage.removeItem('currentUser');
  }
}

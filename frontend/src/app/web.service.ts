import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class WebService
{

  private messageStore = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  constructor(private http: Http)
  {
  }

  getMessages()
  {
    this.http.get('http://localhost:62176/test').subscribe(response =>
    {
      this.messageStore = response.json();
      console.log(response.json());
      console.log(this.messageStore);
      this.messageSubject.next(this.messageStore);
    });
  }
}

import {Component} from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'home',
  template: `
    <div *ngFor="let message of webService.messages | async">
       {{message.value}}
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class HomeComponent {

  constructor(private webService: WebService){}

  ngOnInit()
  {
    this.webService.getMessages();
  }

}

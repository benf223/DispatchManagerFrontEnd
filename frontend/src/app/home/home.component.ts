import {Component} from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})
export class HomeComponent
{
  constructor(public webService: WebService)
  {
  }

  ngOnInit()
  {
    this.webService.getMessages();
  }

  onDragStart(e)
  {
    console.log('start ' + Math.round(e.clientX) + " " + Math.round(e.clientY));
  }

  onDragMove(e)
  {
    console.log('move ' + Math.round(e.clientX) + " " + Math.round(e.clientY));
  }

  onDragEnd(e)
  {
    console.log('end ' + Math.round(e.clientX) + " " + Math.round(e.clientY));
  }
}

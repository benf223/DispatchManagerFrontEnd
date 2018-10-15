import {Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {WebService} from './services/web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private webService : WebService) {}

  // Setup to poll the API every 2 seconds
  ngOnInit() {
    interval(2000).subscribe(() => {
      this.webService.update();
      }
    )
  }
}

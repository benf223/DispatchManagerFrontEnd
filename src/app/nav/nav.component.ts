import {Component} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.scss']
})
export class NavComponent {

  constructor(protected authService : AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}

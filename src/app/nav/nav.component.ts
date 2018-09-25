import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.scss']
})
export class NavComponent implements OnInit {

  canShow;

  constructor(protected authService : AuthService, private router : Router) {
  }

  ngOnInit() {
    this.updateVisibility();

    this.authService.values.subscribe(() => {
      this.updateVisibility();
    });
  }

  updateVisibility() {
    this.canShow = !!localStorage.getItem('currentUser');
  }

  logout() {
    this.authService.logout();
    this.updateVisibility();
    this.router.navigate(['']);
  }
}

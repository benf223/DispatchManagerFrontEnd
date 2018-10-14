import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.scss']
})
export class NavComponent implements OnInit {

  // Variable to control if a button can be shown
  canShow;

  // Inject the AuthService and the router
  constructor(protected authService : AuthService, private router : Router) {
  }

  // Setup for listener to determine button visibility
  ngOnInit() {
    this.updateVisibility();

    this.authService.values.subscribe(() => {
      this.updateVisibility();
    });
  }

  // Changes the visibility of the buttons if the user is logged in or not
  updateVisibility() {
    this.canShow = !!localStorage.getItem('currentUser');
  }

  // Logs the user out
  logout() {
    this.authService.logout();
    this.updateVisibility();
    this.router.navigate(['']);
  }
}

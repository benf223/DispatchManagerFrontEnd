import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Control data for the form
  loginForm : FormGroup;
  returnUrl : string;
  submitted = false;

  // Inject relevant objects
  constructor(private authService : AuthService, private formBuilder : FormBuilder, private router : Router, private route: ActivatedRoute, private alertService : AlertService) { }

  // Setup the form and return routes
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Listener for form submission that will attempt to login the user
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value);
    this.authService.values.subscribe((res) => {
      if (!res.token) {
        return;
      }

      this.router.navigate([this.returnUrl]);
    });
  }

  // Getter for the form data
  get f() { return this.loginForm.controls };
}

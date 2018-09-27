import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  returnUrl : string;
  submitted = false;

  constructor(private authService : AuthService, private formBuilder : FormBuilder, private router : Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

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

  get f() { return this.loginForm.controls };
}

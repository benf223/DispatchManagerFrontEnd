import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../interfaces";
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // Form for the formbuilder
  createUserForm : FormGroup;

  // Field to control form submission
  submitted = false;

  // Inject the formbuilder and AuthService
  constructor(private formBuilder : FormBuilder, private authService : AuthService, private alertService : AlertService) { }

  // Setup the form
  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Getter for the form
  get f() { return this.createUserForm.controls; }

  // Listener for the form submission, attempts to generate a user.
  submitForm() {
    this.submitted = true;

    if (this.createUserForm.invalid) {
      return;
    }

    this.authService.register(this.createUserForm.value);

    this.authService.values.subscribe((res) => {
      if (res.token) {
        // not our concern
        return;
      }

      // Alert user
      this.alertService.success(res.message);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../interfaces";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm : FormGroup;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private authService : AuthService) { }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.createUserForm.controls; }

  submitForm() {
    this.submitted = true;

    if (this.createUserForm.invalid) {
      return;
    }

    this.authService.register(this.createUserForm.value);

    this.authService.values.subscribe((res : User) => {
      if (res.token) {
        // not our concern
        return;
      }

      // Alert user
    });
  }

}

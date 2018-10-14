import {Component, Input, OnInit} from '@angular/core';
import {FullRelease} from "../interfaces";
import {FormBuilder} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {WebService} from '../services/web.service';

@Component({
  selector: 'app-edit-release-form',
  templateUrl: './edit-release-form.component.html',
  styleUrls: ['./edit-release-form.component.css']
})
export class EditReleaseFormComponent implements OnInit {

  // The release to be edited
  @Input() release : FullRelease;

  // Constants
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // The form for the formbuilder
  form;

  // Data for select components
  clients = [{name: 'client1'}, {name: 'client2'}, {name: 'client3'}];
  routes = [{route: 'route1'}, {route: 'route2'}, {route: 'route3'}];
  contTypes = [{type: 'cont-type1'}, {type: 'cont-type2'}, {type: 'cont-type3'}];

  // List for the container numbers
  containerNumbers: string[] = ['Cont-1-a', 'Cont-2-a', 'Cont-3-a'];
  statuses: string[] = ['Started', 'Enroute', 'Delivered'];
  invoiceStatuses: string[] = ['Sent', 'Unsent', 'Paid'];

  // Setup the form and inject the webservice
  constructor(private formBuilder : FormBuilder, private webService : WebService) {
    this.form = formBuilder.group({
      release: ''
    });
  }

  ngOnInit() {
  }

  // Adds item to the chip list
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.containerNumbers.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  // Returns current time to fill the form with time values
  getTime() {
    let date = new Date();
    return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + date.getMinutes();
  }

  // Returns current date to fill the form with date values
  getDate() {
    return new Date();
  }

  // Submits the changes to the release to the webservice
  submitForm() {
    // this.webService
    console.log('Edited');
  }
}

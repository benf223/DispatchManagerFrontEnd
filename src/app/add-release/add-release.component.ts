import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {WebService} from '../services/web.service';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FullRelease} from "../interfaces";

@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {

  // Constants
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // Form for FormBuilder
  form;

  // Data from advanced elements
  status;

  // Data for select components
  clients = [{name: 'client1'}, {name: 'client2'}, {name: 'client3'}];
  routes = [{route: 'route1'}, {route: 'route2'}, {route: 'route3'}];
  contTypes = [{type: 'cont-type1'}, {type: 'cont-type2'}, {type: 'cont-type3'}];

  // List for the container numbers
  containerNumbers: string[] = ['Cont-1-a', 'Cont-2-a', 'Cont-3-a'];
  statuses: string[] = ['Started', 'Enroute', 'Delivered'];
  invoiceStatuses: string[] = ['Sent', 'Unsent', 'Paid'];

  // Default colour for releases
  colour : string = "#000000";

  // Inject the WebService and FormBuilder and prepare initial data.
  constructor(private webService : WebService, private formBuilder : FormBuilder) {
    this.form = formBuilder.group({
      receivedDate: this.getDate(),
      release: '',
      client: '',
      route: '',
      qty20s: '',
      qty40s: '',
      choose: '',
      containerType: '',
      containerNumbers: '',
      dueDate: this.getDate(),
      dueTime: this.getTime(),
      reference: '',
      notes: '',
      status: '',
      completeDate: this.getDate(),
      invoiced: '',
    });
  }

  ngOnInit() {
  }

  // Adds item to the chip list of containers
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

  // Removes items from chip list
  remove(containerNumber: string): void {
    const index = this.containerNumbers.indexOf(containerNumber);

    if (index >= 0) {
      this.containerNumbers.splice(index, 1);
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

  // Will verify and attempt to submit the form to the API
  submitForm() {
    console.log('Submitted');
    console.log(this.form.value);
    console.log(this.status);

    let data : FullRelease = null;

    // This will be where the data is sent to the API
    this.webService.addRelease(data);
  }

  // Listener for when the colour picker is closed
  saveColour(colour) {
    this.colour = colour;
  }
}

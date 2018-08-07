import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {WebService} from '../web.service';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  form;
  clients = [{name: 'client1'}, {name: 'client2'}, {name: 'client3'}];
  routes = [{route: 'route1'}, {route: 'route2'}, {route: 'route3'}];
  contTypes = [{type: 'cont-type1'}, {type: 'cont-type2'}, {type: 'cont-type3'}];
  containerNumbers: string[] = ['Cont-1-a', 'Cont-2-a', 'Cont-3-a'];

  // Inject the WebService and FormBuilder
  constructor(private webService : WebService, private formBuilder : FormBuilder) {
    this.form = formBuilder.group({
      release: ''
    });
  }

  ngOnInit() {
  }

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

  remove(containerNumber: string): void {
    const index = this.containerNumbers.indexOf(containerNumber);

    if (index >= 0) {
      this.containerNumbers.splice(index, 1);
    }
  }

  getTime() {
    let date = new Date();
    return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + date.getMinutes();
  }

  getDate() {
    return new Date();
  }
}

import {Component, OnInit} from '@angular/core';
import {WebService} from '../web.service';

function remove(item: string, list: string[]) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.scss']
})
export class HomeComponent implements OnInit {
  availableBoxes = [
    'Box 1',
    'Box 2'
  ];

  dropzone1 = [
    'Box 3'
  ];

  currentBox?: string;

  constructor(public webService: WebService) {
  }

  ngOnInit() {
    this.webService.getMessages();
  }

  // onDragStart(e) {
  //   console.log('start ' + Math.round(e.clientX) + ' ' + Math.round(e.clientY));
  // }
  //
  // onDragMove(e) {
  //   console.log('move ' + Math.round(e.clientX) + ' ' + Math.round(e.clientY));
  // }
  //
  // onDragEnd(e) {
  //   console.log('end ' + Math.round(e.clientX) + ' ' + Math.round(e.clientY));
  // }

  move(box: string, toList: string[]) {
    remove(box, this.availableBoxes);
    remove(box, this.dropzone1);

    toList.push(box);
  }
}

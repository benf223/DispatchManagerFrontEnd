import {Component, ViewChild,Input,AfterViewInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from './location';
import{LOCATIONS} from './location-list';

@Component({
  selector: 'viewlocationinformation',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Location Information</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><span style="display:inline-block;width:190px;text-align:right;" >Location name</span><input type="text" value={{Location.name}} id="name"></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;" >Location Address</span><input type="text" value={{Location.address}} id="address"></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;" >Openning hour</span><input type="text" value={{Location.opentime}}></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;" >Closing hour</span><input type="text" value={{Location.closetime}}></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;"></span><a href="#">Booking System</a></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-save" (click)="save()">Save</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ViewLocationInformation {
  constructor(public activeModal: NgbActiveModal) {}
	index =0;
	Location = new Location(LOCATIONS[this.index].name,LOCATIONS[this.index].address,LOCATIONS[this.index].opentime,LOCATIONS[this.index].closetime);
	
  get(value){
	this.index=value;
  }
  
  setmethod(index){
	//save edited location information
  }
}
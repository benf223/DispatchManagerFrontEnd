import {Component, ViewChild, Input, AfterViewInit, ElementRef} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from './location';
import {LOCATIONS} from './location-list';
import {WebService} from '../web.service'
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'viewlocationinformation',
  //popup menu for edit current selected location information
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Location Information</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><span style="display:inline-block;width:190px;text-align:right;">Location name</span><input type="text" value={{viewLocation.name}}
        #name></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Location Address</span><input type="text"
                                                                                                        value={{viewLocation.address}}
        #address></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Openning hour</span><input type="text"
                                                                                                     value={{viewLocation.opentime}} #optime
        ></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Closing hour</span><input type="text"
                                                                                                    value={{viewLocation.closetime}} #cltime
        ></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Location type</span>
        <select [(ngModel)]="type">
          <option value="" (change)="change(type)">{{viewLocation.type}}</option>
          <option *ngFor="let x of types">{{x}}</option>
        </select></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;">Require Booking&nbsp;</span><input type="checkbox" #require></p>
      <p><span style="display:inline-block;width:190px;text-align:right;"></span><a href="#">Booking System</a></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-save" (click)="save()">Save</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ViewLocationInformation {
	//variables of location information
  @Input() index = 0;
  @Input() name;
  @Input() inputtype;
  @ViewChild('name') inputName: ElementRef;
  @ViewChild('address') inputAddress: ElementRef;
  @ViewChild('optime') inputOpTime: ElementRef;
  @ViewChild('cltime') inputClTime: ElementRef;
  @ViewChild('require') require: ElementRef;
  //get all locations from database 
  //public temploc = this.webService.locationstore;
  temploc: Array<Location> =[{name:"name",address:"address",opentime:"000",closetime:"000",type:"port",require:true}];
  //console.log(this.temploc);
  constructor(public activeModal: NgbActiveModal,private webService: WebService) {
  }

  types: string[] = ['Port', 'Yard'];
  type: string = '';
  //tempary variable for storing current selected location information
  viewLocation = new Location(this.temploc[this.index].name,this.temploc[this.index].address,
    this.temploc[this.index].opentime, this.temploc[this.index].closetime, this.temploc[this.index].type,this.temploc[this.index].require);

  //update changed data to local location variable 
  update(value) {
    this.viewLocation = new Location(this.temploc[this.index].name, this.temploc[this.index].address,
      this.temploc[this.index].opentime, this.temploc[this.index].closetime, this.temploc[this.index].type,this.temploc[this.index].require);
  }

  // update changed data to database
  save() {
    let Name = this.inputName.nativeElement.value;
    let Address = this.inputAddress.nativeElement.value;
    let OpenTime = this.inputOpTime.nativeElement.value;
    let CloseTime = this.inputClTime.nativeElement.value;
	let Require = this.require.nativeElement.checked;
	this.webService.updateLocation(new Location(Name,Address,OpenTime,CloseTime,this.inputtype,true),"query");
	console.log(new Location(Name,Address,OpenTime,CloseTime,this.inputtype,Require));
    this.activeModal.close('Close click');
  }

  change(value) {
    this.inputtype = value;
  }
}

import {Component, ViewChild, Input, AfterViewInit, ElementRef} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from './location';
import {LOCATIONS} from './location-list';
import {ViewLocationInformation} from './view-location-information.component';
import {getTemplate} from 'codelyzer/util/ngQuery';
import {WebService} from '../web.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'addlocationinformation',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">New Location Information</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><span style="display:inline-block;width:190px;text-align:right;">Location name</span><input type="text" #name></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Location Address</span><input type="text" #address></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Openning hour</span><input type="text" #optime></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Closing hour</span><input type="text" #cltime></p>
      <p><span style="display:inline-block;width:190px;text-align:right;">Location type</span>
        <select [(ngModel)]="type" (change)="change(type)">
          <option value="">Select Location type</option>
          <option *ngFor="let x of types">{{x}}</option>
        </select></p>
		<p><span style="display:inline-block;width:190px;text-align:right;">Require Booking&nbsp;</span><input type="checkbox" #require></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-save" (click)="save()">Add</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class AddLocationInformation implements AfterViewInit {
	
  constructor(public activeModal: NgbActiveModal,private webService:WebService) {
  }
  
  @Input() name;
  @Input() inputtype;
  @ViewChild('name') inputName: ElementRef;
  @ViewChild('address') inputAddress: ElementRef;
  @ViewChild('optime') inputOpTime: ElementRef;
  @ViewChild('cltime') inputClTime: ElementRef;
  @ViewChild('require') require: ElementRef;
  types: string[] = ['Port', 'Yard'];
  type: string = '';
  locationdata = this.webService.locationstore;
 

  ngAfterViewInit() {
  }

  save() {
    let Name = this.inputName.nativeElement.value;
    let Address = this.inputAddress.nativeElement.value;
    let OpenTime = this.inputOpTime.nativeElement.value;
    let CloseTime = this.inputClTime.nativeElement.value;
	let Require = this.require.nativeElement.checked;
	for(var i=0;i<4;i++){
		var checkName = this.locationdata[i].name==Name;
		var checkAddress = this.locationdata[i].address==Address;
		if(checkName||checkAddress){break;}
	}
	if(checkName){
		alert("The location Name already exist");
	} else if(checkAddress) {
		alert("The location Address already exist");
	} else{
		//this.locationdata.push(new Location(Name, Address, OpenTime, CloseTime, this.inputtype,Require));
		this.webService.addLocation(new Location(Name, Address, OpenTime, CloseTime, this.inputtype,Require));
		this.activeModal.close('Close click');
	}
  }

  change(value) {
    this.inputtype = value;
  }
}

@Component({
  selector: 'addlocationcomponent',
  templateUrl: './add-location.component.html',
  styleUrls: ['../app.component.css']
})


export class AddLocationComponent implements AfterViewInit {
  @ViewChild(ViewLocationInformation) viewLocations: ViewLocationInformation;

  ngAfterViewInit() {
    //
  }
   ngOnInit(){
	   //fetching data from database
	   this.webService.getLocation();
	   console.log(this.webService.locationstore);
   }
  constructor(private modalService: NgbModal,private webService:WebService) {
  }

  add() {
    const modalRef = this.modalService.open(AddLocationInformation);

  }

  view(index) {
    const modalRef = this.modalService.open(ViewLocationInformation).componentInstance;
    modalRef.index = index;
    modalRef.update(index);
  }

  selectedlocation: Location;

  onselected(lOcation: Location): void {
    this.selectedlocation = lOcation;
  }

  public locations = this.webService.locationstore;
}

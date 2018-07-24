import {Component, ViewChild,Input,AfterViewInit,ElementRef} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from './location';
import {LOCATIONS} from './location-list';
import {ViewLocationInformation} from './view-location-information.component';
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
      <p><span style="display:inline-block;width:190px;text-align:right;" >Location name</span><input type="text" #name></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;" >Location Address</span><input type="text" #address></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;" >Openning hour</span><input type="text" #optime></p>
	  <p><span style="display:inline-block;width:190px;text-align:right;" >Closing hour</span><input type="text" #cltime></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-save" (click)="save()">Add</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class AddLocationInformation implements AfterViewInit{
  @Input() name;
  @ViewChild('name') inputName:ElementRef;
  @ViewChild('address') inputAddress:ElementRef;
  @ViewChild('optime') inputOpTime:ElementRef;
  @ViewChild('cltime') inputClTime:ElementRef;
  constructor(public activeModal: NgbActiveModal) {}
  
  ngAfterViewInit(){
	  
  }
  
  save(){
	let Name=this.inputName.nativeElement.value;
	let Address=this.inputAddress.nativeElement.value;
	let OpenTime=this.inputOpTime.nativeElement.value;
	let CloseTime=this.inputClTime.nativeElement.value;
	  
	LOCATIONS.push(new Location(Name,Address,OpenTime,CloseTime));
	this.activeModal.close('Close click');
  }
  
}

@Component({
  selector: 'addlocationcomponent',
  templateUrl: './add-location.component.html'
})

export class AddLocationComponent{
  @ViewChild(ViewLocationInformation) viewLocations;
  
  constructor(private modalService: NgbModal) {}
  viewinfo = new ViewLocationInformation();
  open() {
    const modalRef = this.modalService.open(AddLocationInformation);
  }
  index =0;
  
  view(index){
	  const modalRef = this.modalService.open(ViewLocationInformation);
	  this.viewinfo.get(index);
  }
  
  selectedlocation: Location;
  onselected(lOcation:Location): void{
	  this.selectedlocation=lOcation;
  }
  public locations = LOCATIONS;
}
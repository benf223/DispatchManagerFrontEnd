import {Component, ViewChild, Input, AfterViewInit, ElementRef} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from './location';
import {LOCATIONS} from './location-list';

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
  @Input() index = 0;
  @Input() name;
  @Input() inputtype;
  @ViewChild('name') inputName: ElementRef;
  @ViewChild('address') inputAddress: ElementRef;
  @ViewChild('optime') inputOpTime: ElementRef;
  @ViewChild('cltime') inputClTime: ElementRef;
  @ViewChild('require') require: ElementRef;

  constructor(public activeModal: NgbActiveModal) {
  }

  types: string[] = ['Port', 'Yard'];
  type: string = '';
  viewLocation = new Location(LOCATIONS[this.index].name, LOCATIONS[this.index].address,
    LOCATIONS[this.index].opentime, LOCATIONS[this.index].closetime, LOCATIONS[this.index].type,LOCATIONS[this.index].require);

  update(value) {
    this.viewLocation = new Location(LOCATIONS[this.index].name, LOCATIONS[this.index].address,
      LOCATIONS[this.index].opentime, LOCATIONS[this.index].closetime, LOCATIONS[this.index].type,LOCATIONS[this.index].require);
  }

  save() {
    let Name = this.inputName.nativeElement.value;
    let Address = this.inputAddress.nativeElement.value;
    let OpenTime = this.inputOpTime.nativeElement.value;
    let CloseTime = this.inputClTime.nativeElement.value;
    // update data to database
    this.activeModal.close('Close click');
  }

  change(value) {
    this.inputtype = value;
  }
}

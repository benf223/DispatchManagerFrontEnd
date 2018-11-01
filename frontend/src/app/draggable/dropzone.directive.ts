import {Directive, ElementRef, EventEmitter, HostBinding, OnInit, Output, SkipSelf} from '@angular/core';
import {DroppableService} from './droppable.service';

@Directive({
  selector: '[appDropzone]',
  providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {
  // Bindings for CSS styles based on state
  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  // Exposes events for usage on elements
  @Output() drop = new EventEmitter<PointerEvent>();
  @Output() remove = new EventEmitter<PointerEvent>();

  // Fix for android chrome
  private clientRect: ClientRect;

  // Injects services for the Dropzone and the element for the android fix
  constructor(@SkipSelf() private allDroppableService: DroppableService, private innerDroppableService: DroppableService
              , private element: ElementRef) {
  }

  // Setup observables
  ngOnInit() {
    this.allDroppableService.dragStart$.subscribe(() => this.onDragStart());
    this.allDroppableService.dragEnd$.subscribe(event => this.onDragEnd(event));

    this.allDroppableService.dragMove$.subscribe(event => {
      if (this.isEventInside(event)) {
        this.onPointerEnter();
      } else {
        this.onPointerLeave();
      }
    });

    this.innerDroppableService.dragStart$.subscribe(() => this.onInnerDragStart());
    this.innerDroppableService.dragEnd$.subscribe(event => this.onInnerDragEnd(event));
  }

  // Sets state for current elements being dragged into the zone
  private onPointerEnter() {
    if (!this.activated) {
      return;
    }

    this.entered = true;
  }

  // Resets the state when the dragged element leaves the zone
  private onPointerLeave() {
    if (!this.activated) {
      return;
    }

    this.entered = false;
  }

  // Activates the Dropzone when a drag starts
  private onDragStart() {
    this.clientRect = this.element.nativeElement.getBoundingClientRect();

    this.activated = true;
  }

  // Deactivates the Dropzone when a drag ends. Emits events if there is a drop in the dropzone.
  private onDragEnd(event: PointerEvent) {
    if (!this.activated) {
      return;
    }

    if (this.entered) {
      this.drop.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  // Activates the dropzone when an element in the dropzone is dragged.
  private onInnerDragStart() {
    this.activated = true;
    this.entered = true;
  }

  // Deactivates the dropzone when an element in the dropzone is dropped. Emits event if required
  private onInnerDragEnd(event: PointerEvent) {
    if (!this.entered) {
      this.remove.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  // Checks if the element is inside the dropzone
  private isEventInside(event: PointerEvent) {
    return event.clientX >= this.clientRect.left &&
      event.clientX <= this.clientRect.right &&
      event.clientY >= this.clientRect.top &&
      event.clientY <= this.clientRect.bottom;
  }
}

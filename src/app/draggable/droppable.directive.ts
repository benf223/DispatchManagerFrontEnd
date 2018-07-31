import {Directive, HostListener} from '@angular/core';
import {DroppableService} from './droppable.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {

  // Injects Droppable service to expose communication for event propagation
  constructor(private droppableService: DroppableService) { }

  // Listener for elements that should be able to move. Emits event to the service
  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.droppableService.onDragStart(event);
  }

  // Listener for elements that should be able to move. Emits event to the service
  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.droppableService.onDragMove(event);
  }

  // Listener for elements that should be able to move. Emits event to the service
  @HostListener('dragEnd', ['$event']) onDragEnd(event: PointerEvent) {
    this.droppableService.onDragEnd(event);
  }

}

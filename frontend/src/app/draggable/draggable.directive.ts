import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDraggable],[appDroppable]'
})
export class DraggableDirective {

  // State of current drag
  private dragging = false;

  // Exposes events for usage on elements
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  // Binds CSS styles to the state
  @HostBinding('attr.touch-action') touchAction = 'none';
  @HostBinding('class.draggable') draggable = true;

  // Listens to the browsers event and emits to the app
  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void {
    this.dragging = true;
    event.stopPropagation();
    this.dragStart.emit(event);
  }

  // Listens to the browsers event and emits to the app
  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  // Listens to the browsers event and emits to the app
  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }
}

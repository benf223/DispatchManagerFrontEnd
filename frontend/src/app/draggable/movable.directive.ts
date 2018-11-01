import {Directive, HostBinding, HostListener} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {

  // Bindings for CSS styles based on state
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  // Position state information for snapping element back
  private position: Position = {x: 0, y: 0};
  private startPosition: Position;

  // Injects DomSanitizer for CSS styles
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  // Listener for when the drag starts. Sets initial position.
  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
  }

  // Listener for the drag moving. Updates the position.
  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  // Listener for the end of drag.
  @HostListener('dragEnd', ['$event']) onDragEnd() {
  }

}

interface Position {
  x: number;
  y: number;
}

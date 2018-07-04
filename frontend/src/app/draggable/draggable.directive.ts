import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  private dragging = false;

  @HostBinding('class.draggable') draggable = true;

  @HostListener('pointerdown') onPointerDown(): void {
    this.dragging = true;
    console.log('drag start');
  }

  @HostListener('document:pointermove') onPointerMove(): void {
    if (!this.dragging)
      return;

    console.log('drag move');
  }

  @HostListener('document:pointerup') onPointerUp(): void {
    if (!this.dragging)
      return;

    this.dragging = false;
    console.log('drag end');
  }
}

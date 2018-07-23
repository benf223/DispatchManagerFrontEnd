import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DraggableDirective} from './draggable.directive';
import { MovableDirective } from './movable.directive';
import { DropzoneDirective } from './dropzone.directive';
import { DroppableDirective } from './droppable.directive';
import {DroppableService} from './droppable.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, MovableDirective, DropzoneDirective, DroppableDirective],
  exports: [DraggableDirective, MovableDirective, DropzoneDirective, DroppableDirective],
  providers: [DroppableService]
})
export class DraggableModule { }

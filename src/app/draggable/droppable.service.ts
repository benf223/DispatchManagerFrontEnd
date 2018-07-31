import {Injectable, Optional, SkipSelf} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DroppableService {

  // Observables that will expose the relevant pointer events
  dragStart$: Observable<PointerEvent>;
  dragMove$: Observable<PointerEvent>;
  dragEnd$: Observable<PointerEvent>;

  // Subjects for the observables
  private dragStartSubject = new Subject<PointerEvent>();
  private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  // Injects other droppable services
  constructor(@SkipSelf() @Optional() private parent?: DroppableService) {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  // Emits event to the subscribers and propagates to the parent services
  onDragStart(event: PointerEvent) {
    this.dragStartSubject.next(event);

    if (this.parent) {
      this.parent.onDragStart(event);
    }
  }

  // Emits event to the subscribers and propagates to the parent services
  onDragMove(event: PointerEvent) {
    this.dragMoveSubject.next(event);

    if (this.parent) {
      this.parent.onDragMove(event);
    }
  }

  // Emits event to the subscribers and propagates to the parent services
  onDragEnd(event: PointerEvent) {
    this.dragEndSubject.next(event);

    if (this.parent) {
      this.parent.onDragEnd(event);
    }
  }
}

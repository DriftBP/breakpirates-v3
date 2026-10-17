import { Injectable } from '@angular/core';
import { Event } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MockRouterService {
  private readonly eventsSubject = new Subject<Event>();

  get events(): Observable<Event> {
    return this.eventsSubject.asObservable();
  }

  emit(event: Event): void {
    this.eventsSubject.next(event);
  }

  complete(): void {
    this.eventsSubject.complete();
  }
}

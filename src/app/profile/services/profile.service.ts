import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Host } from '../host';
import { Show } from '../../schedule/models/show';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  profiles(): Observable<Host[]> {
    return this.httpRequestService.get<Host[]>(AppSettings.API_BASE + 'hosts');
  }

  profile(id: number): Observable<Host> {
    return this.httpRequestService.get<Host>(AppSettings.API_BASE + `hosts/${id}`);
  }

  profileShows(id: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `hosts/${id}/shows`);
  }

  getProfileLinks(id: number): Observable<{ previous: Host, next: Host }> {
    const observable = new Observable<{ previous: Host, next: Host }>((observer) => {
      this.profiles().subscribe(profiles => {
        const pos = this.getProfilePosition(profiles, id);

        if (pos != -1) {
          const previousPos = this.previousProfileIndex(pos, profiles.length);
          const nextPos = this.nextProfileIndex(pos, profiles.length);

          const previousProfile = profiles[previousPos];
          const nextProfile = profiles[nextPos];

          observer.next({ previous: previousProfile, next: nextProfile });
        }

        observer.complete()
      });
    });

    return observable;
  }

  private getProfilePosition(profiles: Host[], id: number): number {
    return profiles.sort(this.profileCompareFn).findIndex(profile => profile.id === id);
  }

  private previousProfileIndex(pos: number, totalItems: number): number {
    return pos > 0 ? pos - 1 : totalItems - 1;
  }

  private nextProfileIndex(pos: number, totalItems: number): number {
    return pos < totalItems - 1 ? pos + 1 : 0;
  }

  private profileCompareFn(a: Host, b: Host): number {
    return a.id < b.id ? -1 : 1;
  }
}

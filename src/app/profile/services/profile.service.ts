import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Host } from '../host';
import { Show } from '../../schedule/models/show';
import { ProfileResolvesModule } from '../resolves/profile-resolves.module';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable({
  providedIn: ProfileResolvesModule
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
        const pos = profiles.sort(this.profileCompareFn).findIndex(profile => profile.id === id);

        if (pos != -1) {
          const previousPos = pos > 0 ? pos - 1 : profiles.length - 1;
          const nextPos = pos < profiles.length - 1 ? pos + 1 : 0;

          const previousProfile = profiles[previousPos];
          const nextProfile = profiles[nextPos];

          observer.next({ previous: previousProfile, next: nextProfile });
        }

        observer.complete()
      });
    });

    return observable;
  }

  private profileCompareFn(a: Host, b: Host): number {
    return a.id < b.id ? -1 : 1;
  }
}

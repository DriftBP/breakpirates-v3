import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from '../../app-settings';
import { Host } from '../host';
import { Show } from '../../schedule/models/show';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';
import { ContentNavigation, createContentNavigation } from '../../shared/content-navigation/content-navigation';

@Injectable()
export class ProfileService {
  private httpRequestService = inject(HttpRequestService);


  profiles(): Observable<Host[]> {
    return this.httpRequestService.get<Host[]>(AppSettings.API_BASE + 'hosts');
  }

  profile(id: number): Observable<Host> {
    return this.httpRequestService.get<Host>(AppSettings.API_BASE + `hosts/${id}`);
  }

  profileShows(id: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `hosts/${id}/shows`);
  }

  getProfileLinks(id: number): Observable<ContentNavigation | null> {
    return this.profiles().pipe(
      map(profiles => createContentNavigation(
        profiles.sort(this.profileCompareFn),
        id,
        profile => profile.name
      ))
    );
  }

  private profileCompareFn(a: Host, b: Host): number {
    return a.id < b.id ? -1 : 1;
  }
}

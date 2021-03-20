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
    private http: HttpRequestService
  ) { }

  profiles(): Observable<Host[]> {
    return this.http.get<Host[]>(AppSettings.API_BASE + 'hosts');
  }

  profile(id: number): Observable<Host> {
    return this.http.get<Host>(AppSettings.API_BASE + `hosts/${id}`);
  }

  profileShows(id: number): Observable<Show[]> {
    return this.http.get<Show[]>(AppSettings.API_BASE + `hosts/${id}/shows`);
  }
}

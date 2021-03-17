import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from '../app-settings';
import { Host } from './host';
import { Show } from '../schedule/show';
import { ProfileResolvesModule } from './resolves/profile-resolves.module';

@Injectable({
  providedIn: ProfileResolvesModule
})
export class ProfileService {

  constructor(
    private http: HttpClient
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

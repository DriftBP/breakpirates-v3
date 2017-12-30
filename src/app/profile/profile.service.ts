import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../appSettings';
import { Host } from './host';

@Injectable()
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
}

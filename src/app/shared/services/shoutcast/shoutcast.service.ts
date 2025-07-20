import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { AppSettings } from '../../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class ShoutcastService {
  private http = inject(HttpClient);

  // Use the Shoutcast '7.html' endpoint via allorigins CORS proxy
  private statusUrl = `https://api.allorigins.win/raw?url=${AppSettings.STREAM_URL_PRIMARY}7.html`;

  getCurrentTrack(): Observable<string> {
    return this.http.get(this.statusUrl, { responseType: 'text' }).pipe(
      map(text => {
        // The response is a single CSV line, e.g.:
        // 32,1,80,80,31,128,pHiL tHe BaSs HARDCORE 11-07-25</body></html>
        const parts = text.split(',');
        let track = parts[6]?.trim() || '';
        // Remove any trailing HTML tags
        track = track.replace(/<\/body>.*/i, '').trim();
        return track;
      })
    );
  }
}

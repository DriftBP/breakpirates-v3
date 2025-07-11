import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoutcastService {
  // Use the Shoutcast '7.html' endpoint via allorigins CORS proxy
  private statusUrl = 'https://api.allorigins.win/raw?url=http://bpstream.hostco.de:3000/7.html';

  constructor(private http: HttpClient) {}

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

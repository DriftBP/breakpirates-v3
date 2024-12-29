import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';

export const ProfilesResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Host[]> =>
    {
      const profileService = inject(ProfileService);

      return profileService.profiles();
    }

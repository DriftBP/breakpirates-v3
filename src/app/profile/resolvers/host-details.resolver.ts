import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';

export const HostDetailsResolver: ResolveFn<Observable<Host>> =
  (route: ActivatedRouteSnapshot): Observable<Host> =>
    {
      const profileService = inject(ProfileService);

      return profileService.profile(parseInt(route.paramMap.get('id') ?? '', 10));
    }

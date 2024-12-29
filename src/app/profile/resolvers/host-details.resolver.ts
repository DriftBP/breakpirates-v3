import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';

export const HostDetailsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Host> =>
    {
      const profileService = inject(ProfileService);

      return profileService.profile(parseInt(route.paramMap.get('id') ?? '', 10));
    }

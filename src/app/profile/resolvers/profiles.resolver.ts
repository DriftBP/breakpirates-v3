import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';

export const ProfilesResolver: ResolveFn<Observable<Host[]>> =
  (): Observable<Host[]> =>
    {
      const profileService = inject(ProfileService);

      return profileService.profiles();
    }

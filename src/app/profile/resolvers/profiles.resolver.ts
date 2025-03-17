import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';

export const profilesResolver: ResolveFn<Host[]> = () => {
  return inject(ProfileService).profiles();
};

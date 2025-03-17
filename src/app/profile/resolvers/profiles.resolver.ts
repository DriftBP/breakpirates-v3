import { inject } from '@angular/core';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';
import { ResolveFn } from '@angular/router';

export const profilesResolver: ResolveFn<Host[]> = () => {
  return inject(ProfileService).profiles();
};

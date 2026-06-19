import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';

export const hostDetailsResolver: ResolveFn<Host> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ProfileService).profile(parseInt(route.paramMap.get('id') ?? '', 10));
};

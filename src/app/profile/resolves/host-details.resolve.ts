import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ProfileService } from '../services/profile.service';

@Injectable()
export class HostDetailsResolve  {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.profileService.profile(parseInt(route.paramMap.get('id') ?? '', 10));
  }
}

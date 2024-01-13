import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';
import { ProfileResolvesModule } from './profile-resolves.module';

@Injectable({
  providedIn: ProfileResolvesModule
})
export class HostDetailsResolve  {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.profileService.profile(parseInt(route.paramMap.get('id'), 10));
  }
}

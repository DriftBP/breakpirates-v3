import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProfileService } from './profile.service';
import { Host } from './host';

@Injectable()
export class HostDetailsResolve implements Resolve<Host> {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.profileService.profile(parseInt(route.paramMap.get('id'), 10));
  }
}

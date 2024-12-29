import { Injectable } from '@angular/core';

import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfilesResolve  {

  constructor(private profileService: ProfileService) {}

  resolve() {
    return this.profileService.profiles();
  }
}

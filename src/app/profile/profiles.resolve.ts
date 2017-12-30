import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProfileService } from './profile.service';
import { Host } from './host';

@Injectable()
export class ProfilesResolve implements Resolve<Host[]> {

  constructor(private profileService: ProfileService) {}

  resolve() {
    return this.profileService.profiles();
  }
}
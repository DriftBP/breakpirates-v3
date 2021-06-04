import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { Host } from '../host';
import { ProfileResolvesModule } from './profile-resolves.module';

@Injectable({
  providedIn: ProfileResolvesModule
})
export class ProfilesResolve implements Resolve<Host[]> {

  constructor(private profileService: ProfileService) {}

  resolve() {
    return this.profileService.profiles();
  }
}

import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ProfilesComponent } from './profiles.component';
import { ProfileModule } from './profile.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [];

describe('ProfilesComponent', () => {
  let shallow: Shallow<ProfilesComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ProfilesComponent, ProfileModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

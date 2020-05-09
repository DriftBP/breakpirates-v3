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

  it('should default to ascending order', async () => {
    const { instance } = await shallow.render();

    expect(instance.order).toEqual('asc');
  });

  it('should toggle ordering', async () => {
    const { instance } = await shallow.render();

    expect(instance.order).toEqual('asc');
    instance.toggleOrderBy();
    expect(instance.order).toEqual('desc');
    instance.toggleOrderBy();
    expect(instance.order).toEqual('asc');
  });
});

import { waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render';

import { ProfilesComponent } from './profiles.component';
import { ProfileModule } from './profile.module';
import { SortOrder } from './../shared/pipes/sort-order';

const routes: Routes = [];

describe('ProfilesComponent', () => {
  let shallow: Shallow<ProfilesComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ProfilesComponent, ProfileModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should default to ascending order', async () => {
    const { instance } = await shallow.render();

    expect(instance.order).toEqual(SortOrder.Ascending);
  });

  it('should toggle ordering', async () => {
    const { instance } = await shallow.render();

    expect(instance.order).toEqual(SortOrder.Ascending);
    instance.toggleOrderBy();
    expect(instance.order).toEqual(SortOrder.Descending);
    instance.toggleOrderBy();
    expect(instance.order).toEqual(SortOrder.Ascending);
  });
});

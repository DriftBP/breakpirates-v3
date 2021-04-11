import { waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render';

import { HostNavigationComponent } from './host-navigation.component';
import { ProfileModule } from '../profile.module';

const routes: Routes = [];

describe('HostNavigationComponent', () => {
  let shallow: Shallow<HostNavigationComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HostNavigationComponent, ProfileModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should convert string to number', async () => {
    const { instance } = await shallow.render();

    expect(instance.parseInt('10')).toEqual(10);
  });
});

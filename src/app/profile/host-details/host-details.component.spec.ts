import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HostDetailsComponent } from './host-details.component';
import { ProfileModule } from '../profile.module';

const routes: Routes = [];

describe('HostDetailsComponent', () => {
  let shallow: Shallow<HostDetailsComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(HostDetailsComponent, ProfileModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

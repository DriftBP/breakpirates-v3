import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HostDetailsComponent } from './host-details.component';
import { ProfileModule } from '../profile.module';
import { NgModule } from '@angular/core';
import { ProfileResolvesModule } from '../profile-resolves.module';
import { ProfileService } from '../profile.service';

const routes: Routes = [];

describe('HostDetailsComponent', () => {
  let shallow: Shallow<HostDetailsComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HostDetailsComponent, HostDetailsComponentModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

@NgModule({
  imports: [
    RouterModule
  ],
  providers: [
    ProfileService
  ]
})
class HostDetailsComponentModule {}

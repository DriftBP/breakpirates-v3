import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared.module';
import { SocialService } from '../services/social.service';

const routes: Routes = [];

describe('NavigationComponent', () => {
  let shallow: Shallow<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NavigationComponent, SharedModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes))
      .mock(SocialService, {
        getSocialSites: () => []
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

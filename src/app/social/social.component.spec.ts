import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SocialComponent } from './social.component';
import { SocialModule } from './social.module';
import { SocialService } from '../shared/services/social.service';

describe('SocialComponent', () => {
  let shallow: Shallow<SocialComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(SocialComponent, SocialModule)
      .mock(SocialService, {
        getSocialSites: () => []
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

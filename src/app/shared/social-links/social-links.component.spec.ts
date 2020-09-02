import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SocialLinksComponent } from './social-links.component';
import { SharedModule } from '../shared.module';
import { SocialService } from '../services/social.service';

describe('SocialLinksComponent', () => {
  let shallow: Shallow<SocialLinksComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(SocialLinksComponent, SharedModule)
      .mock(SocialService, {
        getSocialSites: () => []
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});


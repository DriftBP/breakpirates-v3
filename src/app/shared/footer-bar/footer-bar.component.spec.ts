import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { FooterBarComponent } from './footer-bar.component';
import { SharedModule } from '../shared.module';
import { SocialService } from '../services/social/social.service';

describe('FooterBarComponent', () => {
  let shallow: Shallow<FooterBarComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(FooterBarComponent, SharedModule)
      .mock(SocialService, {
        getSocialSites: () => []
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SocialLinksComponent } from './social-links.component';
import { SharedModule } from '../shared.module';

describe('SocialLinksComponent', () => {
  let shallow: Shallow<SocialLinksComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(SocialLinksComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});


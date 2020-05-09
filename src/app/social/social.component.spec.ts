import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SocialComponent } from './social.component';
import { SocialModule } from './social.module';

describe('SocialComponent', () => {
  let shallow: Shallow<SocialComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(SocialComponent, SocialModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

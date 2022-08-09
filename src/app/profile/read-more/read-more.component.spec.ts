import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ReadMoreComponent } from './read-more.component';
import { ProfileModule } from '../profile.module';

describe('ReadMoreComponent', () => {
  let shallow: Shallow<ReadMoreComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ReadMoreComponent, ProfileModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

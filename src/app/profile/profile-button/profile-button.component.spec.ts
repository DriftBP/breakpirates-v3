import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ProfileButtonComponent } from './profile-button.component';
import { ProfileModule } from '../profile.module';
import { Host } from '../host';

const mockHost: Host = {
  id: 1,
  name: 'name',
  image: 'image.jpg',
  location: 'location'
};

describe('ProfileButtonComponent', () => {
  let shallow: Shallow<ProfileButtonComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ProfileButtonComponent, ProfileModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render({bind: {host: mockHost}});

    expect(element.nativeElement).toBeTruthy();
  });
});

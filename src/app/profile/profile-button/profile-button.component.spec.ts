import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import { Host } from '../host';

const mockHost: Host = {
  id: 1,
  name: 'name',
  image: 'image.jpg',
  location: 'location'
};

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileButtonComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
    component.host = {
      id: 1,
      name: '',
      image: ''
    };
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

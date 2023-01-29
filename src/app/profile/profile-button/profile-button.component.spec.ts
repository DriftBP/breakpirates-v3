import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ ProfileButtonComponent ]
    });
    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

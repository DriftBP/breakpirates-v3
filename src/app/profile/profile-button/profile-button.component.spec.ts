import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import { ActivatedRoute } from '@angular/router';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          ProfileButtonComponent
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          }
        ]
    });
    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

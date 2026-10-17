import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ProfileButtonComponent } from './profile-button.component';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;

  beforeEach(async () => {
    localStorage.removeItem('bp_followed_profiles');
    TestBed.configureTestingModule({
      imports: [
        ProfileButtonComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    });
    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('toggles following from a profile card', () => {
    fixture.componentRef.setInput('host', {
      id: 12,
      name: 'DJ Example',
      biog: null,
      image: null,
      location: null,
      mixcloud: null,
      twitter: null
    });
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.debugElement.query(By.css('bp-follow-profile-button button')).nativeElement;
    expect(button.getAttribute('aria-pressed')).toBe('false');

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});

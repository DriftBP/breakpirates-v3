import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';

import { FooterBarComponent } from './footer-bar.component';
import { SocialService } from '../../social/services/social.service';
import { MockSocialService } from '../../../test/services/mock.social.service';

describe('FooterBarComponent', () => {
  let component: FooterBarComponent;
  let fixture: ComponentFixture<FooterBarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FooterBarComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: SocialService,
          useClass: MockSocialService
        }
      ]
    });
    fixture = TestBed.createComponent(FooterBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

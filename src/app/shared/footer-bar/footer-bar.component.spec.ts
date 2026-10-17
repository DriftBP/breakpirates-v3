import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

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
          provide: TranslateService,
          useClass: MockTranslateService
        },
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

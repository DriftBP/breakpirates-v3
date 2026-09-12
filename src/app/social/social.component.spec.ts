import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../test/services/mock.translate.service';

import SocialComponent from './social.component';
import { MockSocialService } from '../../test/services/mock.social.service';
import { SocialService } from './services/social.service';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          SocialComponent,
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
    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

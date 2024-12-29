import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FooterBarComponent } from './footer-bar.component';
import { SocialService } from '../../social/services/social.service';
import { MockSocialService } from '../../../test/services/mock.social.service';

describe('FooterBarComponent', () => {
  let component: FooterBarComponent;
  let fixture: ComponentFixture<FooterBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          FooterBarComponent,
          TranslateModule.forRoot(),
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
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

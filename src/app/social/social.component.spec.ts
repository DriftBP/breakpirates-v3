import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SocialComponent } from './social.component';
import { MockSocialService } from '../../test/services/mock.social.service';
import { SocialService } from './services/social.service';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          SocialComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: SocialService,
            useClass: MockSocialService
          }
        ]
    });
    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

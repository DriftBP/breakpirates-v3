import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

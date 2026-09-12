import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import DjNameComponent from './dj-name.component';

describe('DjNameComponent', () => {
  let component: DjNameComponent;
  let fixture: ComponentFixture<DjNameComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        DjNameComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    });
    fixture = TestBed.createComponent(DjNameComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

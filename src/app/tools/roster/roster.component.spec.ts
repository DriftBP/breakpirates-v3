import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import RosterComponent from './roster.component';

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RosterComponent,
          TranslatePipe
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          }
        ]
    });
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../test/services/mock.translate.service';

import { StandalonePlayerComponent } from './standalone-player.component';

describe('StandalonePlayerComponent', () => {
  let component: StandalonePlayerComponent;
  let fixture: ComponentFixture<StandalonePlayerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          StandalonePlayerComponent,
          TranslatePipe
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          }
        ]
    });
    fixture = TestBed.createComponent(StandalonePlayerComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

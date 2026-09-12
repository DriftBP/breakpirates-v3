import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import { HostNavigationComponent } from './host-navigation.component';

describe('HostNavigationComponent', () => {
  let component: HostNavigationComponent;
  let fixture: ComponentFixture<HostNavigationComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          HostNavigationComponent,
          TranslatePipe
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          }
        ]
    });
    fixture = TestBed.createComponent(HostNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

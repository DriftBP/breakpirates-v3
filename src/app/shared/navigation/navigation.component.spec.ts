import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationComponent } from './navigation.component';
import { MockRouterService } from '../../../test/services/mock.router.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          NavigationComponent,
          TranslateModule.forRoot(),
          NoopAnimationsModule
        ],
        providers: [
          {
            provide: Router,
            useClass: MockRouterService
          },
          {
            provide: ActivatedRoute,
            useValue: {}
          }
        ]
    });
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

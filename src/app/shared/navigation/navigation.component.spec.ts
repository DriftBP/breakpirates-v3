import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationComponent } from './navigation.component';
import { MockRouterService } from '../../../test/services/mock.router.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ NavigationComponent ],
        imports: [
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: Router,
            useClass: MockRouterService
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

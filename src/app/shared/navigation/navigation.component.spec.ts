import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import { NavigationComponent } from './navigation.component';
import { MockRouterService } from '../../../test/services/mock.router.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
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
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('groups music, video, and tools under More', () => {
    fixture.detectChanges();

    const moreMenu = fixture.nativeElement.querySelector('#nav-more').parentElement;

    expect(moreMenu.querySelector('a[routerLink="/music"]')).toBeTruthy();
    expect(moreMenu.querySelector('a[routerLink="/video"]')).toBeTruthy();
    expect(moreMenu.querySelector('a[routerLink="/tools"]')).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ProfilesComponent } from './profiles.component';
import { SortOrder } from '../shared/pipes/sort-order';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../test/services/mock.breadcrumb.service';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          ProfilesComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          }
        ]
    });
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should default to ascending order', async () => {
    expect(component.order).toEqual(SortOrder.Ascending);
  });

  it('should toggle ordering', async () => {
    expect(component.order).toEqual(SortOrder.Ascending);
    component.toggleOrderBy();
    expect(component.order).toEqual(SortOrder.Descending);
    component.toggleOrderBy();
    expect(component.order).toEqual(SortOrder.Ascending);
  });
});

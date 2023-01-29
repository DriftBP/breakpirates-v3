import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HostDetailsComponent } from './host-details.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { ProfileService } from '../services/profile.service';
import { MockProfileService } from '../../../test/services/mock.profile.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';

describe('HostDetailsComponent', () => {
  let component: HostDetailsComponent;
  let fixture: ComponentFixture<HostDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ HostDetailsComponent ],
        imports: [
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: ProfileService,
            useClass: MockProfileService
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          }
        ]
    });
    fixture = TestBed.createComponent(HostDetailsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should recognise non-empty value', async () => {
    expect(component.hasValue('test')).toBeTruthy();
  });

  it('should recognise empty value', async () => {
    expect(component.hasValue(null)).toBeFalsy();
    expect(component.hasValue('')).toBeFalsy();
  });
});

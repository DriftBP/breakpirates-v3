import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { VideoDetailsComponent } from './video-details.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { MockSafePipe } from '../../../test/pipes/mock.safe.pipe';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          VideoDetailsComponent,
          MockSafePipe
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
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

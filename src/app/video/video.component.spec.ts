import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { VideoComponent } from './video.component';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../test/services/mock.breadcrumb.service';

const routes: Routes = [];

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          VideoComponent
        ],
        imports: [
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
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

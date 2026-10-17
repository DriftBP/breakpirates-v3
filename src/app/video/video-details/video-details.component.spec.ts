import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { VideoDetailsComponent } from './video-details.component';
import { MockTranslateService } from '../../../test/services/mock.translate.service';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        VideoDetailsComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: BreadcrumbService,
          useClass: MockBreadcrumbService
        },
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('shows previous and next videos with wraparound links', () => {
    const videos = [
      { id: 1, name: 'First video', code: '', date: '2025-01-01' },
      { id: 2, name: 'Current video', code: '', date: '2025-01-02' },
      { id: 3, name: 'Last video', code: '', date: '2025-01-03' }
    ];

    fixture.componentRef.setInput('video', videos[0]);
    fixture.componentRef.setInput('videos', videos);
    fixture.detectChanges();

    const links: HTMLAnchorElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.content-navigation__link')
    );

    expect(links.map(link => link.textContent?.trim())).toEqual(['Last video', 'Current video']);
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/video/3', '/video/2']);
  });
});

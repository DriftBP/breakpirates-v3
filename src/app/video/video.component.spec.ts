import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../test/services/mock.translate.service';

import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        VideoComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    });
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('groups videos by year while preserving video order', () => {
    fixture.componentRef.setInput('videos', [
      { id: 1, name: 'Video 1', code: '', date: '2025-01-01' },
      { id: 2, name: 'Video 2', code: '', date: '2024-12-31' },
      { id: 3, name: 'Video 3', code: '', date: '2025-06-01' }
    ]);

    expect(component.videosByYear()).toEqual([
      { year: 2025, videos: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 3 })] },
      { year: 2024, videos: [expect.objectContaining({ id: 2 })] }
    ]);
  });
});

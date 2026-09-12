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
});

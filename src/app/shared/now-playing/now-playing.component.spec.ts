import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import { NowPlayingComponent } from './now-playing.component';
import { NowPlayingService } from '../services/now-playing/now-playing.service';
import { MockNowPlayingService } from '../../../test/services/mock.now-playing.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

describe('NowPlayingComponent', () => {
  let component: NowPlayingComponent;
  let fixture: ComponentFixture<NowPlayingComponent>;

  // Mock MediaElementPlayer for tests
  beforeAll(() => {
    global.MediaElementPlayer = global.MediaElementPlayer || function() { return; };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NowPlayingComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: NowPlayingService,
          useClass: MockNowPlayingService
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(NowPlayingComponent);
    component = fixture.componentInstance;
  });

  it('should always have an image filename', () => {
    fixture.detectChanges();

    expect(component.nowPlayingImage).toBeTruthy();
  });

  it('should diplay embedded player when not on https', () => {
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const player = compiled.querySelector('bp-radio-player');

    expect(player).toBeTruthy();
  });
});

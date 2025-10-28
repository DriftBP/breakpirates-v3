import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NowPlayingComponent } from './now-playing.component';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';

declare var global: any;

describe('NowPlayingComponent', () => {
  let component: NowPlayingComponent;
  let fixture: ComponentFixture<NowPlayingComponent>;

  // Plyr is initialized in the component when needed.

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NowPlayingComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    fixture = TestBed.createComponent(NowPlayingComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should always have an image filename', async () => {
    fixture.detectChanges();

    expect(component.nowPlayingImage).toBeTruthy();
  });

  it('should diplay embedded player when not on https', async () => {
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const player = compiled.querySelector('bp-radio-player');

    expect(player).toBeTruthy();
  });
});

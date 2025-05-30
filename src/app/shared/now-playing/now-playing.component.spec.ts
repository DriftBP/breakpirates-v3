import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { NowPlayingComponent } from './now-playing.component';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';
import { MockSafePipe } from '../../../test/pipes/mock.safe.pipe';
import { MockTimePipe } from '../../../test/pipes/mock.time.pipe';

describe('NowPlayingComponent', () => {
  let component: NowPlayingComponent;
  let fixture: ComponentFixture<NowPlayingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NowPlayingComponent
      ],
      imports: [
        MockSafePipe,
        MockTimePipe,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        }
      ]
    });
    fixture = TestBed.createComponent(NowPlayingComponent);
    component = fixture.componentInstance;
  }));

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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { RateMyTakeawaySoundboardComponent } from './rate-my-takeaway-soundboard.component';
import { SoundboardService } from './soundboard.service';
import { MockSoundboardService } from '../../../test/services/mock.soundboard.service';

describe('RateMyTakeawaySoundboardComponent', () => {
  let component: RateMyTakeawaySoundboardComponent;
  let fixture: ComponentFixture<RateMyTakeawaySoundboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ RateMyTakeawaySoundboardComponent ],
        imports: [
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: SoundboardService,
            useValue: MockSoundboardService
          }
        ]
    });
    fixture = TestBed.createComponent(RateMyTakeawaySoundboardComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

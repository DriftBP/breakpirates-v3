import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VideoDetailsComponent } from './video-details.component';
import { SafePipe } from '../../shared/safe.pipe';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoDetailsComponent,
        SafePipe
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

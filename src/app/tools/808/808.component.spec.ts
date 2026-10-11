import { ComponentFixture, TestBed } from '@angular/core/testing';

import Drum808Component from './808.component';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Drum808Component', () => {
  let component: Drum808Component;
  let fixture: ComponentFixture<Drum808Component>;

  beforeAll(() => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
    })) as any;

    class MockAudioBuffer {}
    class MockAudioBufferSourceNode {
      buffer: unknown;
      connect() {
        return;
      }
      start() {
        return;
      }
    }
    class MockAudioContext {
      public currentTime = 0;
      public state = 'running';
      createBufferSource() { return new MockAudioBufferSourceNode(); }
      decodeAudioData() { return Promise.resolve(new MockAudioBuffer()); }
      resume() { return Promise.resolve(); }
      get destination() { return {}; }
    }

    (globalThis as any).AudioContext = MockAudioContext;
    (globalThis as any).webkitAudioContext = MockAudioContext;
    Object.defineProperty(HTMLElement.prototype, 'animate', {
      configurable: true,
      value: vi.fn(() => ({ cancel: vi.fn(), startTime: null }))
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drum808Component]
    }).compileComponents();
    fixture = TestBed.createComponent(Drum808Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads samples before starting the sequencer and reuses them', async () => {
    const scheduleSpy = vi.spyOn(component, 'scheduleSteps').mockImplementation(() => undefined);
    const fetchMock = vi.mocked(globalThis.fetch);
    component.isPlaying = true;

    await component.startSequencer();

    expect(fetchMock).toHaveBeenCalledTimes(component.drums.length);
    expect(scheduleSpy).toHaveBeenCalledWith(0);

    await component.ensureAudioContext();
    expect(fetchMock).toHaveBeenCalledTimes(component.drums.length);
    component.stopSequencer();
  });

  it('moves the playhead according to the audio clock', async () => {
    const requestFrameSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockReturnValue(1);
    const cancelFrameSpy = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => undefined);
    vi.spyOn(component, 'scheduleSteps').mockImplementation(() => undefined);
    const grid = fixture.nativeElement.querySelector('.tr808__steps') as HTMLElement;
    const stepCells = grid.querySelectorAll<HTMLElement>('.tr808__step');
    vi.spyOn(grid, 'getBoundingClientRect').mockReturnValue({ left: 100 } as DOMRect);
    vi.spyOn(stepCells[0], 'getBoundingClientRect').mockReturnValue({ left: 200, width: 18 } as DOMRect);
    vi.spyOn(stepCells[1], 'getBoundingClientRect').mockReturnValue({ left: 221, width: 18 } as DOMRect);
    const playhead = fixture.nativeElement.querySelector('.tr808__playhead') as HTMLElement;
    const animation = { cancel: vi.fn(), startTime: null } as unknown as Animation;
    const animateSpy = vi.spyOn(playhead, 'animate').mockReturnValue(animation);
    component.isPlaying = true;

    await component.startSequencer();
    const audioContext = (component as any).audioContext as { currentTime: number };

    expect(animateSpy).toHaveBeenCalledWith([
      { transform: 'translateX(109px)' },
      { transform: 'translateX(781px)' }
    ], expect.objectContaining({ duration: 4000, iterations: Infinity, easing: 'linear' }));
    expect(playhead.style.visibility).toBe('visible');

    audioContext.currentTime = (component as any).playheadStartTime + (60 / component.tempo) / 4 + 0.01;
    (component as any).updatePlayhead();
    expect(component.currentStep).toBe(1);

    component.stopSequencer();
    expect(animation.cancel).toHaveBeenCalled();
    expect(playhead.style.visibility).toBe('hidden');
    requestFrameSpy.mockRestore();
    cancelFrameSpy.mockRestore();
  });
});

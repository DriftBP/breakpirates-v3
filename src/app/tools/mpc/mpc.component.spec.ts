import { TestBed } from '@angular/core/testing';

import MpcComponent from './mpc.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

describe('MpcComponent', () => {
  let component: MpcComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: BreadcrumbService, useValue: { setBreadcrumb: vi.fn() } }]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new MpcComponent());
  });

  it('creates 16 pads with the requested keyboard layout', () => {
    expect(component.pads.map(pad => pad.key).join('')).toBe('1234qwerasdfzxcv');
    expect(component.pads).toHaveLength(16);
  });

  it('clamps tempo and stretches loops to the declared bar duration', () => {
    const loopPad = component.pads[0];
    loopPad.mode = 'loop';
    loopPad.bars = 2;
    loopPad.buffer = { duration: 4 } as AudioBuffer;

    component.updateTempo(140);

    expect(component.tempo).toBe(140);
    expect((component as unknown as { playbackRateFor(pad: typeof loopPad): number }).playbackRateFor(loopPad)).toBeCloseTo(140 / 120);

    component.updateTempo(500);
    expect(component.tempo).toBe(200);
  });

  it('schedules pad hits on the selected tempo grid', () => {
    const quantizedStartTime = (component as unknown as { quantizedStartTime(currentTime: number): number }).quantizedStartTime.bind(component);

    expect(quantizedStartTime(0.13)).toBeCloseTo(0.25);
    expect(quantizedStartTime(0.25)).toBeCloseTo(0.25);

    component.updateQuantizeGrid(2);
    expect(quantizedStartTime(0.13)).toBeCloseTo(0.25);

    component.updateTempo(60);
    expect(quantizedStartTime(0.13)).toBeCloseTo(0.5);
  });

  it('stops all active voices without clearing the pads', () => {
    const stop = vi.fn();
    const voices = (component as unknown as { voices: Array<AudioBufferSourceNode | null> }).voices;
    voices[2] = { stop, onended: null } as unknown as AudioBufferSourceNode;
    voices[9] = { stop, onended: null } as unknown as AudioBufferSourceNode;
    component.activePadIndex = 9;

    component.stopAll();

    expect(stop).toHaveBeenCalledTimes(2);
    expect(voices[2]).toBeNull();
    expect(voices[9]).toBeNull();
    expect(component.activePadIndex).toBeNull();
  });
});

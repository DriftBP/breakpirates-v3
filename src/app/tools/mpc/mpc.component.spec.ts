import { TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

import MpcComponent from './mpc.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

describe('MpcComponent', () => {
  let component: MpcComponent;

  beforeEach(async () => {
    localStorage.removeItem('breakpirates-mpc-state');
    await TestBed.configureTestingModule({
      providers: [
        { provide: BreadcrumbService, useValue: { setBreadcrumb: vi.fn() } },
        { provide: ChangeDetectorRef, useValue: { markForCheck: vi.fn() } }
      ]
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

  it('persists tempo and quantize settings in local storage', () => {
    component.updateTempo(132);
    component.updateQuantizeGrid(8);

    const savedState = JSON.parse(localStorage.getItem('breakpirates-mpc-state') ?? '{}');
    expect(savedState.tempo).toBe(132);
    expect(savedState.quantizeDivisions).toBe(8);
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

  it('maps 16 Levels pads to ascending semitone pitches around the root pad', () => {
    component.pads[5].buffer = { duration: 1 } as AudioBuffer;
    component.pads[5].sampleName = 'Bass hit';
    component.selectedPadIndex = 5;
    component.toggleSixteenLevels();

    expect(component.sixteenLevels).toBe(true);
    expect(component.pitchRateForPad(5)).toBe(1);
    expect(component.pitchRateForPad(6)).toBeCloseTo(Math.pow(2, 1 / 12));
    expect(component.pitchRateForPad(4)).toBeCloseTo(Math.pow(2, -1 / 12));

    component.toggleSixteenLevels();
    expect(component.sixteenLevels).toBe(false);
    expect(component.pads[5].sampleName).toBe('Bass hit');
  });

  it('stops all active voices without clearing the pads', () => {
    const stop = vi.fn();
    const voices = (component as unknown as { voices: (AudioBufferSourceNode | null)[] }).voices;
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

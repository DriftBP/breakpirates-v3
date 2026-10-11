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

  it('resets pads and saved settings after confirmation', async () => {
    const clearSavedSamples = vi.spyOn(component as unknown as { clearSavedSamples: () => Promise<void> }, 'clearSavedSamples').mockResolvedValue();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.pads[0].sampleName = 'Loop';
    component.pads[0].buffer = { duration: 2 } as AudioBuffer;
    component.pads[0].mode = 'loop';
    component.pads[0].bars = 4;
    component.updateTempo(140);
    component.updateQuantizeGrid(8);
    component.sixteenLevels = true;
    component.levelSourcePadIndex = 1;

    await component.resetSampler();

    expect(clearSavedSamples).toHaveBeenCalledOnce();
    expect(component.pads[0]).toMatchObject({ sampleName: null, buffer: null, mode: 'oneshot', bars: 1 });
    expect(component.tempo).toBe(120);
    expect(component.quantizeDivisions).toBe(4);
    expect(component.sixteenLevels).toBe(false);
    expect(component.levelSourcePadIndex).toBeNull();
    expect(localStorage.getItem('breakpirates-mpc-state')).toBeNull();
  });

  it('leaves the sampler unchanged when reset is cancelled', async () => {
    const clearSavedSamples = vi.spyOn(component as unknown as { clearSavedSamples: () => Promise<void> }, 'clearSavedSamples').mockResolvedValue();
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.pads[0].sampleName = 'Keep me';

    await component.resetSampler();

    expect(clearSavedSamples).not.toHaveBeenCalled();
    expect(component.pads[0].sampleName).toBe('Keep me');
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

  it('keeps loop voices independent from one-shot playback on the same pad', async () => {
    const existingLoop = { stop: vi.fn(), onended: null } as unknown as AudioBufferSourceNode;
    const newOneShot = {
      buffer: null,
      loop: false,
      playbackRate: { value: 1 },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      onended: null as (() => void) | null
    } as unknown as AudioBufferSourceNode;
    const context = {
      state: 'running',
      currentTime: 0,
      destination: {},
      createBufferSource: vi.fn(() => newOneShot),
      resume: vi.fn()
    } as unknown as AudioContext;
    const componentInternals = component as unknown as {
      audioContext: AudioContext;
      loopVoices: (AudioBufferSourceNode | null)[];
      oneShotVoices: (AudioBufferSourceNode | null)[];
      restorePromise: Promise<void>;
    };
    componentInternals.audioContext = context;
    componentInternals.loopVoices[0] = existingLoop;
    component.pads[0].buffer = { duration: 1 } as AudioBuffer;
    component.sixteenLevels = true;
    component.levelSourcePadIndex = 0;

    await component.triggerPad(0);

    expect(existingLoop.stop).not.toHaveBeenCalled();
    expect(componentInternals.loopVoices[0]).toBe(existingLoop);
    expect(componentInternals.oneShotVoices[0]).toBe(newOneShot);
  });

  it('stops all active voices without clearing the pads', () => {
    const stop = vi.fn();
    const componentInternals = component as unknown as {
      loopVoices: (AudioBufferSourceNode | null)[];
      oneShotVoices: (AudioBufferSourceNode | null)[];
    };
    componentInternals.loopVoices[2] = { stop, onended: null } as unknown as AudioBufferSourceNode;
    componentInternals.oneShotVoices[9] = { stop, onended: null } as unknown as AudioBufferSourceNode;
    component.activePadIndex = 9;

    component.stopAll();

    expect(stop).toHaveBeenCalledTimes(2);
    expect(componentInternals.loopVoices[2]).toBeNull();
    expect(componentInternals.oneShotVoices[9]).toBeNull();
    expect(component.activePadIndex).toBeNull();
  });
});

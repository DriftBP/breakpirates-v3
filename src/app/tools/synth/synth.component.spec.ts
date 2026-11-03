import { ComponentFixture, TestBed } from '@angular/core/testing';

import SynthComponent from './synth.component';

describe('SynthComponent', () => {
  let fixture: ComponentFixture<SynthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SynthComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(SynthComponent);
    fixture.detectChanges();
  });

  it('renders two wave selectors and the live synth controls', () => {
    const element = fixture.nativeElement as HTMLElement;
    const waveSelectors = element.querySelectorAll<HTMLSelectElement>('.synth__oscillator select');

    expect(element.querySelector('h1')?.textContent).toContain('Dual oscillator synth');
    expect(element.querySelectorAll('#bass-preset option')).toHaveLength(10);
    expect(waveSelectors).toHaveLength(2);
    expect(waveSelectors[0].value).toBe('sawtooth');
    expect(waveSelectors[1].value).toBe('sawtooth');
    expect(element.querySelector('#detune')).toBeTruthy();
    expect(element.querySelector('#low-pass')).toBeTruthy();
    expect(element.querySelector('#high-pass')).toBeTruthy();
    expect(element.querySelector('#resonance')).toBeTruthy();
    expect(element.querySelector('#distortion')).toBeTruthy();
    expect(element.querySelector('#accent')).toBeTruthy();
    expect(element.querySelector('#wobble-rate')).toBeTruthy();
    expect(element.querySelector('#wobble-depth')).toBeTruthy();
    expect(element.querySelectorAll('#beat-pattern option')).toHaveLength(10);
    expect(element.querySelector('.synth__beat-button')).toBeTruthy();
    expect(element.querySelector('#beat-level')).toBeTruthy();
    expect(element.querySelector('canvas')).toBeTruthy();
    expect(fixture.componentInstance.frequency).toBe(55);
    expect(fixture.componentInstance.lowPass).toBe(1550);
    expect(fixture.componentInstance.wobbleDepth).toBe(72);
    expect(fixture.componentInstance.distortion).toBe(74);
    expect(fixture.componentInstance.detune).toBe(18);
  });

  it('provides ten distinct drum patterns', () => {
    const signatures = fixture.componentInstance.beatOptions.map(beat => JSON.stringify(beat));

    expect(fixture.componentInstance.beatOptions).toHaveLength(10);
    expect(new Set(signatures).size).toBe(10);
  });

  it('keeps the current bass as preset one and restores the previous sound as preset two', () => {
    const component = fixture.componentInstance;
    expect(component.selectedPreset).toBe(0);
    expect(component.waveA).toBe('sawtooth');
    expect(component.waveB).toBe('sawtooth');
    expect(component.detune).toBe(18);

    component.applyBassPreset(1);

    expect(component.selectedPreset).toBe(1);
    expect(component.waveA).toBe('sawtooth');
    expect(component.waveB).toBe('square');
    expect(component.blend).toBe(30);
    expect(component.detune).toBe(0);
    expect(component.lowPass).toBe(1800);
    expect(component.resonance).toBe(5.5);
    expect(component.wobbleRate).toBe(4.5);
    expect(component.wobbleDepth).toBe(82);
    expect(component.distortion).toBe(65);
  });

  it('updates the shared beat level gain in real time', () => {
    const beatBus = { gain: { setTargetAtTime: vi.fn() }, disconnect: vi.fn() };
    Object.assign(fixture.componentInstance, {
      audioContext: { currentTime: 2, close: vi.fn().mockResolvedValue(undefined) },
      beatBus
    });

    fixture.componentInstance.updateBeatLevel();

    expect(beatBus.gain.setTargetAtTime).toHaveBeenCalledWith(fixture.componentInstance.beatLevel / 100, 2, 0.02);
  });

  it('applies accent amount to both oscillator gains in real time', () => {
    const gainA = { gain: { setTargetAtTime: vi.fn() }, disconnect: vi.fn() };
    const gainB = { gain: { setTargetAtTime: vi.fn() }, disconnect: vi.fn() };
    Object.assign(fixture.componentInstance, {
      audioContext: { currentTime: 1, close: vi.fn().mockResolvedValue(undefined) },
      gainA,
      gainB
    });

    fixture.componentInstance.updateSound();

    const expectedLevel = 0.22 * (1 + (fixture.componentInstance.accent / 100) * 1.4);
    expect(gainA.gain.setTargetAtTime).toHaveBeenCalledWith(expectedLevel * (1 - fixture.componentInstance.blend / 100), 1, 0.015);
    expect(gainB.gain.setTargetAtTime).toHaveBeenCalledWith(expectedLevel * (fixture.componentInstance.blend / 100), 1, 0.015);
  });

  it('spreads the default saw oscillators around the bass pitch', () => {
    const oscillatorA = {
      frequency: { setTargetAtTime: vi.fn() },
      detune: { setTargetAtTime: vi.fn() },
      type: 'sine',
      stop: vi.fn(),
      disconnect: vi.fn()
    };
    const oscillatorB = {
      frequency: { setTargetAtTime: vi.fn() },
      detune: { setTargetAtTime: vi.fn() },
      type: 'sine',
      stop: vi.fn(),
      disconnect: vi.fn()
    };
    Object.assign(fixture.componentInstance, {
      audioContext: { currentTime: 1, close: vi.fn().mockResolvedValue(undefined) },
      oscillatorA,
      oscillatorB
    });

    fixture.componentInstance.updateSound();

    expect(oscillatorA.detune.setTargetAtTime).toHaveBeenCalledWith(-9, 1, 0.015);
    expect(oscillatorB.detune.setTargetAtTime).toHaveBeenCalledWith(9, 1, 0.015);
  });

  it('sends wobble rate and depth to the low-pass modulation nodes', () => {
    const lowPassFrequency = { setTargetAtTime: vi.fn() };
    const wobbleFrequency = { setTargetAtTime: vi.fn() };
    const wobbleGain = { gain: { setTargetAtTime: vi.fn() }, disconnect: vi.fn() };
    const lowPassFilter = { frequency: lowPassFrequency, Q: { value: 0 }, disconnect: vi.fn() };
    const wobbleOscillator = { frequency: wobbleFrequency, stop: vi.fn(), disconnect: vi.fn() };
    Object.assign(fixture.componentInstance, {
      audioContext: { currentTime: 1, close: vi.fn().mockResolvedValue(undefined) },
      lowPassFilter,
      wobbleOscillator,
      wobbleGain
    });

    fixture.componentInstance.updateSound();

    const amount = Math.min((fixture.componentInstance.lowPass - 20) / 2, fixture.componentInstance.lowPass * (fixture.componentInstance.wobbleDepth / 200));
    expect(wobbleFrequency.setTargetAtTime).toHaveBeenCalledWith(fixture.componentInstance.wobbleRate, 1, 0.02);
    expect(wobbleGain.gain.setTargetAtTime).toHaveBeenCalledWith(amount, 1, 0.02);
    expect(lowPassFrequency.setTargetAtTime).toHaveBeenCalledWith(fixture.componentInstance.lowPass - amount, 1, 0.02);
  });

  it('creates a nonlinear waveshaper curve for the selected drive', () => {
    const waveshaper = { curve: null as Float32Array | null, oversample: 'none' as OverSampleType, disconnect: vi.fn() };
    Object.assign(fixture.componentInstance, {
      audioContext: { currentTime: 1, close: vi.fn().mockResolvedValue(undefined) },
      waveshaper
    });

    fixture.componentInstance.updateSound();

    expect(waveshaper.curve).toBeInstanceOf(Float32Array);
    expect(waveshaper.curve?.[0]).toBe(-1);
    expect(waveshaper.curve?.[2048]).toBeGreaterThan(0);
    expect(waveshaper.curve?.[2048]).toBeLessThan(1);
    expect(waveshaper.curve?.[4095]).toBe(1);
  });
});

import { Component, ElementRef, NgZone, OnDestroy, OnInit, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

type WaveShape = OscillatorType;
type DrumBeat = {
  label: string;
  kick: number[];
  snare: number[];
  closedHat: number[];
  openHat: number[];
};
type BassPreset = {
  name: string;
  waveA: WaveShape;
  waveB: WaveShape;
  frequency: number;
  blend: number;
  detune: number;
  lowPass: number;
  highPass: number;
  resonance: number;
  accent: number;
  wobbleRate: number;
  wobbleDepth: number;
  distortion: number;
};

@Component({
  selector: 'bp-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.scss'],
  imports: [FormsModule]
})
export default class SynthComponent implements OnInit, OnDestroy {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly ngZone = inject(NgZone);
  private readonly waveformCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('waveformCanvas');

  readonly waveOptions: { value: WaveShape; label: string }[] = [
    { value: 'sawtooth', label: 'Saw' },
    { value: 'square', label: 'Square' },
    { value: 'triangle', label: 'Triangle' },
    { value: 'sine', label: 'Sine' }
  ];
  readonly bassPresets: BassPreset[] = [
    { name: 'Wide Reese', waveA: 'sawtooth', waveB: 'sawtooth', frequency: 55, blend: 48, detune: 18, lowPass: 1550, highPass: 25, resonance: 4.2, accent: 72, wobbleRate: 3.8, wobbleDepth: 72, distortion: 74 },
    { name: 'Saw / Square', waveA: 'sawtooth', waveB: 'square', frequency: 55, blend: 30, detune: 0, lowPass: 1800, highPass: 25, resonance: 5.5, accent: 72, wobbleRate: 4.5, wobbleDepth: 82, distortion: 65 },
    { name: 'Fog Horn', waveA: 'square', waveB: 'sawtooth', frequency: 45, blend: 65, detune: 4, lowPass: 620, highPass: 25, resonance: 10, accent: 84, wobbleRate: 2.3, wobbleDepth: 90, distortion: 86 },
    { name: 'Rubber Mid', waveA: 'triangle', waveB: 'square', frequency: 65, blend: 35, detune: 24, lowPass: 1900, highPass: 35, resonance: 5, accent: 68, wobbleRate: 5.5, wobbleDepth: 68, distortion: 58 },
    { name: 'Talkback Pulse', waveA: 'square', waveB: 'sawtooth', frequency: 70, blend: 55, detune: 8, lowPass: 900, highPass: 30, resonance: 8, accent: 80, wobbleRate: 3, wobbleDepth: 60, distortion: 92 },
    { name: 'Hoover Roll', waveA: 'sawtooth', waveB: 'triangle', frequency: 73, blend: 42, detune: 32, lowPass: 2400, highPass: 30, resonance: 3.4, accent: 70, wobbleRate: 1.8, wobbleDepth: 48, distortion: 66 },
    { name: 'Dark Reese', waveA: 'sawtooth', waveB: 'sawtooth', frequency: 49, blend: 55, detune: 26, lowPass: 1080, highPass: 25, resonance: 6.8, accent: 78, wobbleRate: 4.2, wobbleDepth: 85, distortion: 82 },
    { name: 'Stomp Stab', waveA: 'square', waveB: 'sawtooth', frequency: 55, blend: 72, detune: 0, lowPass: 1300, highPass: 40, resonance: 7.5, accent: 92, wobbleRate: 6.8, wobbleDepth: 100, distortion: 92 },
    { name: 'Sub Growl', waveA: 'triangle', waveB: 'sawtooth', frequency: 43, blend: 38, detune: 12, lowPass: 750, highPass: 20, resonance: 5, accent: 88, wobbleRate: 2.7, wobbleDepth: 55, distortion: 76 },
    { name: 'Mid Rattle', waveA: 'sawtooth', waveB: 'square', frequency: 87, blend: 60, detune: 30, lowPass: 3200, highPass: 50, resonance: 2.8, accent: 74, wobbleRate: 7.2, wobbleDepth: 66, distortion: 88 }
  ];
  readonly beatOptions: DrumBeat[] = [
    { label: 'Pressure', kick: [0, 3, 8, 11], snare: [4, 12, 15], closedHat: [0, 2, 3, 4, 6, 8, 10, 11, 12, 14], openHat: [7, 15] },
    { label: 'Skipper', kick: [0, 6, 10, 14], snare: [4, 11, 12], closedHat: [0, 2, 4, 6, 8, 10, 12, 14], openHat: [7, 15] },
    { label: 'Roll-back', kick: [0, 3, 8, 11, 14], snare: [4, 12, 15], closedHat: [1, 3, 5, 7, 9, 11, 13, 15], openHat: [7, 15] },
    { label: 'Swing', kick: [0, 6, 8, 11, 14], snare: [4, 10, 12, 15], closedHat: [0, 3, 4, 7, 8, 11, 12, 15], openHat: [7, 15] },
    { label: 'Stepper', kick: [0, 5, 8, 10, 14], snare: [4, 11, 12], closedHat: [0, 2, 4, 6, 8, 10, 12, 14], openHat: [7, 15] },
    { label: 'Offbeat', kick: [0, 3, 6, 8, 11, 14], snare: [4, 10, 12], closedHat: [0, 2, 4, 6, 8, 10, 12, 14], openHat: [7, 15] },
    { label: 'Half-time', kick: [0, 7, 10], snare: [8, 14], closedHat: [0, 2, 4, 6, 8, 10, 12, 14], openHat: [7, 15] },
    { label: 'Chop', kick: [0, 3, 7, 8, 11, 14], snare: [4, 9, 12, 14], closedHat: [1, 3, 5, 7, 9, 11, 13, 15], openHat: [7, 15] },
    { label: 'Rusher', kick: [0, 3, 6, 8, 11, 14], snare: [4, 7, 12, 15], closedHat: [0, 2, 4, 6, 8, 10, 12, 14], openHat: [3, 11, 15] },
    { label: 'Shuffle', kick: [0, 5, 8, 10, 13], snare: [4, 11, 12], closedHat: [0, 3, 4, 7, 8, 11, 12, 15], openHat: [6, 14] }
  ];

  selectedPreset = 0;
  waveA: WaveShape = this.bassPresets[0].waveA;
  waveB: WaveShape = this.bassPresets[0].waveB;
  frequency = this.bassPresets[0].frequency;
  blend = this.bassPresets[0].blend;
  detune = this.bassPresets[0].detune;
  lowPass = this.bassPresets[0].lowPass;
  highPass = this.bassPresets[0].highPass;
  resonance = this.bassPresets[0].resonance;
  accent = this.bassPresets[0].accent;
  wobbleRate = this.bassPresets[0].wobbleRate;
  wobbleDepth = this.bassPresets[0].wobbleDepth;
  distortion = this.bassPresets[0].distortion;
  selectedBeat = 0;
  beatLevel = 180;
  isBeatPlaying = false;
  isPlaying = false;
  audioError = '';

  private audioContext: AudioContext | null = null;
  private oscillatorA: OscillatorNode | null = null;
  private oscillatorB: OscillatorNode | null = null;
  private subOscillator: OscillatorNode | null = null;
  private wobbleOscillator: OscillatorNode | null = null;
  private gainA: GainNode | null = null;
  private gainB: GainNode | null = null;
  private subGain: GainNode | null = null;
  private wobbleGain: GainNode | null = null;
  private waveshaper: WaveShaperNode | null = null;
  private appliedDistortion = -1;
  private lowPassFilter: BiquadFilterNode | null = null;
  private highPassFilter: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  private animationFrameId: number | null = null;
  private accentTimeout: ReturnType<typeof setTimeout> | null = null;
  private beatSchedulerId: ReturnType<typeof setTimeout> | null = null;
  private beatStep = 0;
  private nextBeatTime = 0;
  private noiseBuffer: AudioBuffer | null = null;
  private beatBus: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private masterOutputGain: GainNode | null = null;
  private readonly beatTempo = 174;

  private readonly breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    { name: 'Dual oscillator synth', isActive: true }
  ];

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  async togglePlayback(): Promise<void> {
    if (this.isPlaying) {
      this.stopPlayback();
      return;
    }

    try {
      const context = this.getAudioContext();
      if (context.state === 'suspended') await context.resume();
      this.createVoice(context);
      this.isPlaying = true;
      this.audioError = '';
      this.ngZone.runOutsideAngular(() => this.drawWaveform());
    } catch {
      this.audioError = 'Audio could not start. Check your browser audio settings and try again.';
      this.stopPlayback();
    }
  }

  updateSound(): void {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    if (this.oscillatorA) {
      this.oscillatorA.type = this.waveA;
      this.oscillatorA.frequency.setTargetAtTime(this.frequency, now, 0.015);
      this.oscillatorA.detune.setTargetAtTime(-this.detune / 2, now, 0.015);
    }
    if (this.oscillatorB) {
      this.oscillatorB.type = this.waveB;
      this.oscillatorB.frequency.setTargetAtTime(this.frequency, now, 0.015);
      this.oscillatorB.detune.setTargetAtTime(this.detune / 2, now, 0.015);
    }
    this.subOscillator?.frequency.setTargetAtTime(this.frequency, now, 0.015);
    const accentGain = 0.22 * (1 + (this.accent / 100) * 1.4);
    this.gainA?.gain.setTargetAtTime(accentGain * (1 - this.blend / 100), now, 0.015);
    this.gainB?.gain.setTargetAtTime(accentGain * (this.blend / 100), now, 0.015);
    this.subGain?.gain.setTargetAtTime(0.14, now, 0.015);
    this.lowPassFilter?.frequency.setTargetAtTime(this.lowPass - this.wobbleAmount(), now, 0.02);
    this.wobbleOscillator?.frequency.setTargetAtTime(this.wobbleRate, now, 0.02);
    this.wobbleGain?.gain.setTargetAtTime(this.wobbleAmount(), now, 0.02);
    if (this.waveshaper && this.appliedDistortion !== this.distortion) {
      this.waveshaper.curve = this.createDistortionCurve(this.distortion);
      this.appliedDistortion = this.distortion;
    }
    this.highPassFilter?.frequency.setTargetAtTime(this.highPass, now, 0.02);
    this.lowPassFilter && (this.lowPassFilter.Q.value = this.resonance);
    this.highPassFilter && (this.highPassFilter.Q.value = this.resonance * 0.35);
  }

  applyBassPreset(index: number): void {
    const preset = this.bassPresets[index];
    if (!preset) return;
    this.selectedPreset = index;
    this.waveA = preset.waveA;
    this.waveB = preset.waveB;
    this.frequency = preset.frequency;
    this.blend = preset.blend;
    this.detune = preset.detune;
    this.lowPass = preset.lowPass;
    this.highPass = preset.highPass;
    this.resonance = preset.resonance;
    this.accent = preset.accent;
    this.wobbleRate = preset.wobbleRate;
    this.wobbleDepth = preset.wobbleDepth;
    this.distortion = preset.distortion;
    this.updateSound();
  }

  triggerAccent(): void {
    if (!this.audioContext || !this.isPlaying) return;
    const now = this.audioContext.currentTime;
    this.gainA?.gain.cancelScheduledValues(now);
    this.gainB?.gain.cancelScheduledValues(now);
    this.updateSound();
    const baseLevel = 0.22 * (1 + (this.accent / 100) * 1.4);
    const baseA = baseLevel * (1 - this.blend / 100);
    const baseB = baseLevel * (this.blend / 100);
    const accentPeak = 0.2 * (this.accent / 100);
    this.gainA?.gain.setValueAtTime(baseA, now);
    this.gainB?.gain.setValueAtTime(baseB, now);
    this.gainA?.gain.linearRampToValueAtTime(baseA + accentPeak * (1 - this.blend / 100), now + 0.012);
    this.gainB?.gain.linearRampToValueAtTime(baseB + accentPeak * (this.blend / 100), now + 0.012);
    this.gainA?.gain.setTargetAtTime(baseA, now + 0.04, 0.12);
    this.gainB?.gain.setTargetAtTime(baseB, now + 0.04, 0.12);
    if (this.accentTimeout) clearTimeout(this.accentTimeout);
    this.accentTimeout = setTimeout(() => this.accentTimeout = null, 220);
  }

  async toggleBeat(): Promise<void> {
    if (this.isBeatPlaying) {
      this.stopBeat();
      return;
    }

    try {
      const context = this.getAudioContext();
      if (context.state === 'suspended') await context.resume();
      this.ensureBeatBus(context);
      this.isBeatPlaying = true;
      this.beatStep = 0;
      this.nextBeatTime = context.currentTime + 0.05;
      this.scheduleBeatSteps();
    } catch {
      this.audioError = 'The beat could not start. Check your browser audio settings and try again.';
      this.isBeatPlaying = false;
    }
  }

  updateBeatLevel(): void {
    if (!this.audioContext || !this.beatBus) return;
    this.beatBus.gain.setTargetAtTime(this.beatLevel / 100, this.audioContext.currentTime, 0.02);
  }

  ngOnDestroy(): void {
    this.stopBeat();
    this.stopPlayback();
    this.beatBus?.disconnect();
    this.masterCompressor?.disconnect();
    this.masterOutputGain?.disconnect();
    void this.audioContext?.close();
  }

  private getAudioContext(): AudioContext {
    if (this.audioContext) return this.audioContext;
    const AudioContextConstructor = window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) throw new Error('Web Audio API is not supported');
    this.audioContext = new AudioContextConstructor();
    return this.audioContext;
  }

  private createVoice(context: AudioContext): void {
    this.oscillatorA = context.createOscillator();
    this.oscillatorB = context.createOscillator();
    this.subOscillator = context.createOscillator();
    this.wobbleOscillator = context.createOscillator();
    this.gainA = context.createGain();
    this.gainB = context.createGain();
    this.subGain = context.createGain();
    this.wobbleGain = context.createGain();
    this.waveshaper = context.createWaveShaper();
    this.lowPassFilter = context.createBiquadFilter();
    this.highPassFilter = context.createBiquadFilter();
    this.analyser = context.createAnalyser();

    this.lowPassFilter.type = 'lowpass';
    this.highPassFilter.type = 'highpass';
    this.subOscillator.type = 'sine';
    this.wobbleOscillator.type = 'sine';
    this.waveshaper.oversample = '4x';
    this.analyser.fftSize = 2048;
    this.oscillatorA.connect(this.gainA);
    this.oscillatorB.connect(this.gainB);
    this.gainA.connect(this.waveshaper);
    this.gainB.connect(this.waveshaper);
    this.waveshaper.connect(this.lowPassFilter);
    this.subOscillator.connect(this.subGain);
    this.subGain.connect(this.lowPassFilter);
    this.lowPassFilter.connect(this.highPassFilter);
    this.highPassFilter.connect(this.analyser);
    this.ensureMasterOutput(context);
    this.analyser.connect(this.masterCompressor!);
    this.wobbleOscillator.connect(this.wobbleGain);
    this.wobbleGain.connect(this.lowPassFilter.frequency);
    this.updateSound();
    this.oscillatorA.start();
    this.oscillatorB.start();
    this.subOscillator.start();
    this.wobbleOscillator.start();
  }

  private scheduleBeatSteps(): void {
    if (!this.isBeatPlaying || !this.audioContext) return;
    const scheduleAhead = 0.12;
    const stepDuration = 60 / this.beatTempo / 4;
    while (this.nextBeatTime < this.audioContext.currentTime + scheduleAhead) {
      this.scheduleBeatStep(this.beatStep, this.nextBeatTime);
      this.nextBeatTime += stepDuration;
      this.beatStep = (this.beatStep + 1) % 16;
    }
    this.beatSchedulerId = setTimeout(() => this.scheduleBeatSteps(), 25);
  }

  private scheduleBeatStep(step: number, time: number): void {
    const context = this.audioContext;
    const beat = this.beatOptions[this.selectedBeat];
    if (!context || !beat) return;
    if (beat.kick.includes(step)) this.scheduleKick(context, time);
    if (beat.snare.includes(step)) this.scheduleSnare(context, time);
    if (beat.closedHat.includes(step)) this.scheduleNoiseHit(context, time, 0.045, 7000, 0.075);
    if (beat.openHat.includes(step)) this.scheduleNoiseHit(context, time, 0.16, 6500, 0.12);
  }

  private scheduleKick(context: AudioContext, time: number): void {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(165, time);
    oscillator.frequency.exponentialRampToValueAtTime(42, time + 0.085);
    envelope.gain.setValueAtTime(0.9, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.17);
    oscillator.connect(envelope);
    envelope.connect(this.beatBus!);
    oscillator.start(time);
    oscillator.stop(time + 0.18);
    this.scheduleNoiseHit(context, time, 0.022, 4200, 0.24);
  }

  private scheduleSnare(context: AudioContext, time: number): void {
    this.scheduleNoiseHit(context, time, 0.18, 1400, 0.38);
    const body = context.createOscillator();
    const envelope = context.createGain();
    body.type = 'triangle';
    body.frequency.setValueAtTime(190, time);
    body.frequency.exponentialRampToValueAtTime(105, time + 0.09);
    envelope.gain.setValueAtTime(0.32, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    body.connect(envelope);
    envelope.connect(this.beatBus!);
    body.start(time);
    body.stop(time + 0.13);
  }

  private scheduleNoiseHit(context: AudioContext, time: number, duration: number, cutoff: number, level: number): void {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    source.buffer = this.getNoiseBuffer(context);
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(cutoff, time);
    envelope.gain.setValueAtTime(level, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + duration);
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(this.beatBus!);
    source.start(time);
    source.stop(time + duration);
  }

  private getNoiseBuffer(context: AudioContext): AudioBuffer {
    if (!this.noiseBuffer) {
      this.noiseBuffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
      const samples = this.noiseBuffer.getChannelData(0);
      for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;
    }
    return this.noiseBuffer;
  }

  private stopBeat(): void {
    if (this.beatSchedulerId !== null) clearTimeout(this.beatSchedulerId);
    this.beatSchedulerId = null;
    this.isBeatPlaying = false;
  }

  private ensureBeatBus(context: AudioContext): void {
    if (this.beatBus) return;
    this.ensureMasterOutput(context);
    this.beatBus = context.createGain();
    this.beatBus.gain.value = this.beatLevel / 100;
    this.beatBus.connect(this.masterCompressor!);
  }

  private ensureMasterOutput(context: AudioContext): void {
    if (this.masterCompressor) return;
    this.masterCompressor = context.createDynamicsCompressor();
    this.masterOutputGain = context.createGain();
    this.masterCompressor.threshold.value = -9;
    this.masterCompressor.knee.value = 4;
    this.masterCompressor.ratio.value = 12;
    this.masterCompressor.attack.value = 0.003;
    this.masterCompressor.release.value = 0.16;
    this.masterCompressor.connect(this.masterOutputGain);
    this.masterOutputGain.gain.value = 2;
    this.masterOutputGain.connect(context.destination);
  }

  private stopPlayback(): void {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    if (this.accentTimeout) clearTimeout(this.accentTimeout);
    this.accentTimeout = null;
    for (const oscillator of [this.oscillatorA, this.oscillatorB, this.subOscillator, this.wobbleOscillator]) {
      try {
        oscillator?.stop();
        oscillator?.disconnect();
      } catch {
        // Oscillators can already be stopped when the component is destroyed.
      }
    }
    this.gainA?.disconnect();
    this.gainB?.disconnect();
    this.subGain?.disconnect();
    this.wobbleGain?.disconnect();
    this.waveshaper?.disconnect();
    this.lowPassFilter?.disconnect();
    this.highPassFilter?.disconnect();
    this.analyser?.disconnect();
    this.oscillatorA = null;
    this.oscillatorB = null;
    this.subOscillator = null;
    this.wobbleOscillator = null;
    this.gainA = null;
    this.gainB = null;
    this.subGain = null;
    this.wobbleGain = null;
    this.waveshaper = null;
    this.appliedDistortion = -1;
    this.lowPassFilter = null;
    this.highPassFilter = null;
    this.analyser = null;
    this.isPlaying = false;
  }

  private wobbleAmount(): number {
    return Math.min((this.lowPass - 20) / 2, this.lowPass * (this.wobbleDepth / 200));
  }

  private createDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
    const samples = 4096;
    const drive = (amount / 100) * 30;
    const curve = new Float32Array(samples);
    for (let index = 0; index < samples; index++) {
      const input = (index * 2) / (samples - 1) - 1;
      curve[index] = ((1 + drive) * input) / (1 + drive * Math.abs(input));
    }
    return curve;
  }

  private drawWaveform(): void {
    if (!this.isPlaying || !this.analyser) return;
    const canvas = this.waveformCanvas().nativeElement;
    const bounds = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(bounds.width * pixelRatio));
    const height = Math.max(1, Math.floor(bounds.height * pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.strokeStyle = '#294044';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, bounds.height / 2);
    context.lineTo(bounds.width, bounds.height / 2);
    context.stroke();

    const samples = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(samples);
    context.strokeStyle = '#f3aa59';
    context.lineWidth = 2;
    context.beginPath();
    const sliceWidth = bounds.width / samples.length;
    samples.forEach((sample, index) => {
      const x = index * sliceWidth;
      const y = (sample / 128) * (bounds.height / 2);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
    this.animationFrameId = requestAnimationFrame(() => this.drawWaveform());
  }
}

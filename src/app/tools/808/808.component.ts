import { ChangeDetectorRef, Component, ElementRef, inject, NgZone, OnDestroy, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bp-808',
  templateUrl: './808.component.html',
  styleUrls: ['./808.component.scss'],
  imports: [CommonModule, FormsModule]
})
export default class Drum808Component implements OnInit, OnDestroy {
  private readonly stepsGrid = viewChild.required<ElementRef<HTMLElement>>('stepsGrid');
  private readonly playhead = viewChild.required<ElementRef<HTMLElement>>('playhead');
  private readonly ngZone = inject(NgZone);

  drums = [
    { label: 'Kick', sound: 'kick' },
    { label: 'Snare', sound: 'snare' },
    { label: 'Clap', sound: 'clap' },
    { label: 'Closed Hat', sound: 'closed-hat' },
    { label: 'Open Hat', sound: 'open-hat' },
    { label: 'Low Tom', sound: 'low-tom' },
    { label: 'Mid Tom', sound: 'mid-tom' },
    { label: 'High Tom', sound: 'high-tom' },
    { label: 'Low Conga', sound: 'low-conga' },
    { label: 'Mid Conga', sound: 'mid-conga' },
    { label: 'High Conga', sound: 'high-conga' },
    { label: 'Rim', sound: 'rim' },
    { label: 'Cowbell', sound: 'cowbell' },
    { label: 'Clave', sound: 'clave' },
    { label: 'Maracas', sound: 'maracas' }
  ];

  steps = Array(32).fill(0);
  // Classic 808 beat: Kick on 1, 9, 17, 25; Snare/Clap on 5, 13, 21, 29; Hi-Hat on all 32
  sequence: boolean[][] = [
    // Kick (electro: strong on 1, 9, 11, 17, 25)
    [true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
    // Snare (electro: on 5, 13, 21, 29)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    // Clap (electro: on 5, 13, 21, 29, with ghost notes)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    // Closed Hat (steady 16th)
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    // Open Hat (syncopated)
    [false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true],
    // Rim (electro accent)
    [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false],
    // Cowbell (electro flavor)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
    // Clave (syncopated electro)
    [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false],
    // Maracas (shaker, subtle)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Low Tom
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Mid Tom
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // High Tom
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Low Conga
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Mid Conga
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // High Conga
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  ];

  currentStep = 0;
  isPlaying = false;
  tempo = 120;
  sharedBeat = '';
  private _tempo = 120;

  private audioContext: AudioContext | null = null;
  private audioBuffers: Record<string, AudioBuffer | null> = {};
  private loadingBuffers: Promise<void> | null = null;
  private schedulerId: number | null = null;
  private audioNextStepTime = 0; // in seconds
  private schedulerGeneration = 0;
  private playheadStartTime = 0;
  private playheadStartX = 0;
  private playheadStepWidth = 0;
  private playheadAnimation: Animation | null = null;
  private animationFrameId: number | null = null;

  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // Ensure tempo is initialized to 120
    this.tempo = 120;

    // Watch for tempo changes
    Object.defineProperty(this, 'tempo', {
      get: () => this._tempo,
      set: (value: number) => {
        this._tempo = value;
        if (this.isPlaying) {
          this.restartSequencer();
        }
      },
      configurable: true
    });
    this._tempo = this.tempo;
  }

  async ensureAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    if (!this.loadingBuffers) {
      this.loadingBuffers = this.loadAudioBuffers().catch(error => {
        this.loadingBuffers = null;
        throw error;
      });
    }
    await this.loadingBuffers;
  }

  private async loadAudioBuffers() {
    const context = this.audioContext!;
    await Promise.all(this.drums.map(async drum => {
      const response = await fetch(`/assets/808/${drum.sound}.wav`);
      if (!response.ok) {
        throw new Error(`Failed to load drum sample: ${drum.sound}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffers[drum.sound] = await context.decodeAudioData(arrayBuffer);
    }));
  }

  async playSound(drum: { sound: string }) {
    await this.ensureAudioContext();
    const ctx = this.audioContext!;
    const buffer = this.audioBuffers[drum.sound];
    if (!buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  }

  toggleStep(drumIdx: number, stepIdx: number) {
    this.sequence[drumIdx][stepIdx] = !this.sequence[drumIdx][stepIdx];
  }

  togglePlay() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.stopSequencer();
      return;
    }
    this.isPlaying = true;
    void this.startSequencer();
  }

  async startSequencer() {
    this.stopSequencer();
    this.currentStep = 0;
    const generation = this.schedulerGeneration;
    try {
      await this.ensureAudioContext();
    } catch (error) {
      console.error('Unable to prepare drum samples', error);
      if (generation === this.schedulerGeneration) {
        this.isPlaying = false;
        this.stopSequencer();
      }
      return;
    }
    if (!this.isPlaying || generation !== this.schedulerGeneration) return;
    this.audioNextStepTime = this.audioContext!.currentTime + 0.05;
    this.playheadStartTime = this.audioNextStepTime;
    this.measurePlayhead();
    this.ngZone.runOutsideAngular(() => {
      this.scheduleSteps(0); // pass starting step
      this.startPlayheadAnimation();
      this.updatePlayhead();
    });
  }

  scheduleSteps(schedulerStep: number) {
    const lookahead = 25; // ms
    const stepInterval = (60 / this.tempo) / 4; // seconds per step
    const scheduleAheadTime = 0.2; // seconds
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    let step = schedulerStep;
    let time = this.audioNextStepTime;
    while (time < now + scheduleAheadTime) {
      this.scheduleStep(step, time);
      time += stepInterval;
      step = (step + 1) % this.steps.length;
    }
    this.audioNextStepTime = time;
    this.schedulerId = setTimeout(() => this.scheduleSteps(step), lookahead);
  }

  scheduleStep(stepIdx: number, time: number) {
    this.drums.forEach((drum, drumIdx) => {
      if (this.sequence[drumIdx][stepIdx]) {
        this.playSoundAtTime(drum, time);
      }
    });
  }

  private updatePlayhead() {
    if (!this.isPlaying || !this.audioContext) return;

    const stepInterval = (60 / this.tempo) / 4;
    const elapsed = Math.max(0, this.audioContext.currentTime - this.playheadStartTime);
    const position = elapsed / stepInterval;
    const step = Math.floor(position) % this.steps.length;
    if (step !== this.currentStep) {
      this.currentStep = step;
      this.cdr.detectChanges();
    }

    this.animationFrameId = requestAnimationFrame(() => this.updatePlayhead());
  }

  private startPlayheadAnimation() {
    const delay = Math.max(0, this.playheadStartTime - this.audioContext!.currentTime) * 1000;
    const animation = this.playhead().nativeElement.animate([
      { transform: `translateX(${this.playheadStartX}px)` },
      { transform: `translateX(${this.playheadStartX + this.playheadStepWidth * this.steps.length}px)` }
    ], {
      duration: (60 / this.tempo / 4) * this.steps.length * 1000,
      iterations: Infinity,
      easing: 'linear',
      fill: 'both'
    });
    const timelineTime = document.timeline?.currentTime;
    if (typeof timelineTime === 'number') {
      animation.startTime = timelineTime + delay;
    }
    this.playhead().nativeElement.style.visibility = 'visible';
    this.playheadAnimation = animation;
  }

  private measurePlayhead() {
    const grid = this.stepsGrid().nativeElement;
    const stepCells = grid.querySelectorAll<HTMLElement>('.tr808__step');
    if (stepCells.length < 2) return;

    const gridLeft = grid.getBoundingClientRect().left;
    const firstStep = stepCells[0].getBoundingClientRect();
    const secondStep = stepCells[1].getBoundingClientRect();
    this.playheadStartX = firstStep.left - gridLeft + firstStep.width / 2;
    this.playheadStepWidth = secondStep.left - firstStep.left;
  }

  playSoundAtTime(drum: { sound: string }, time: number) {
    const ctx = this.audioContext!;
    const buffer = this.audioBuffers[drum.sound];
    if (!buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(time);
  }

  stopSequencer() {
    this.schedulerGeneration++;
    if (this.schedulerId !== null) {
      clearTimeout(this.schedulerId);
      this.schedulerId = null;
    }
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.playheadAnimation?.cancel();
    this.playheadAnimation = null;
    this.playhead().nativeElement.style.visibility = 'hidden';
    this.currentStep = 0;

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.isPlaying = false;
    this.schedulerGeneration++;
    if (this.schedulerId !== null) {
      clearTimeout(this.schedulerId);
      this.schedulerId = null;
    }
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.playheadAnimation?.cancel();
    this.playheadAnimation = null;
    void this.audioContext?.close();
  }

  playCurrentStep() {
    this.drums.forEach((drum, drumIdx) => {
      if (this.sequence[drumIdx][this.currentStep]) {
        this.playSound(drum);
      }
    });
  }

  restartSequencer() {
    if (this.isPlaying) {
      this.startSequencer();
    }
  }

  // Add method to encode the current beat as a shareable string
  getShareableBeat(): string {
    // Convert the sequence to a base64 string
    const flat = this.sequence.flat().map(v => v ? 1 : 0);
    const bin = flat.join('');
    // Pad to nearest 8 bits
    const pad = bin + '0'.repeat((8 - (bin.length % 8)) % 8);
    const bytes = [];
    for (let i = 0; i < pad.length; i += 8) {
      bytes.push(parseInt(pad.slice(i, i + 8), 2));
    }
    return btoa(String.fromCharCode(...bytes));
  }

  // Add method to load a beat from a shareable string
  loadShareableBeat(str: string) {
    try {
      const bin = Array.from(atob(str)).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
      let idx = 0;
      for (let d = 0; d < this.drums.length; d++) {
        for (let s = 0; s < this.steps.length; s++) {
          this.sequence[d][s] = bin[idx++] === '1';
        }
      }
    } catch {
      alert('Invalid beat code');
    }
  }

  shareBeat() {
    this.sharedBeat = this.getShareableBeat();
    setTimeout(() => {
      const input = document.querySelector('input[placeholder="Paste beat code here"]') as HTMLInputElement;
      if (input) input.select();
    }, 0);
  }

  loadBeat() {
    if (this.sharedBeat) {
      this.loadShareableBeat(this.sharedBeat);
    }
  }

  clearBeat() {
    for (let d = 0; d < this.drums.length; d++) {
      for (let s = 0; s < this.steps.length; s++) {
        this.sequence[d][s] = false;
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bp-808',
  templateUrl: './808.component.html',
  styleUrls: ['./808.component.scss'],
  imports: [CommonModule, FormsModule]
})
export default class Drum808Component implements OnInit {
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
    // Kick
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
    // Snare
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
    // Clap
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    // Closed Hat
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    // Open Hat
    [false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true],
    // Low Tom
    [false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true],
    // Mid Tom
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // High Tom
    [false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true],
    // Low Conga
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Mid Conga
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // High Conga
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Rim
    [false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false],
    // Cowbell
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    // Clave
    [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false],
    // Maracas
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  ];

  currentStep = 0;
  isPlaying = false;
  tempo = 120;
  sharedBeat: string = '';
  private _tempo: number = 120;

  private audioContext: AudioContext | null = null;
  private audioBuffers: { [key: string]: AudioBuffer | null } = {};
  private loadingBuffers: Promise<void>[] = [];
  private nextStepTime: number = 0;
  private schedulerId: any = null;
  private audioNextStepTime: number = 0; // in seconds

  ngOnInit() {
    // Create AudioContext on user gesture (defer until play)
    // Preload all drum samples as AudioBuffers
    this.audioContext = null;
    this.audioBuffers = {};
    this.loadingBuffers = this.drums.map(async drum => {
      const response = await fetch(`/assets/808/${drum.sound}.wav`);
      const arrayBuffer = await response.arrayBuffer();
      // AudioContext may not be available yet, so decode later
      this.audioBuffers[drum.sound] = await (window.AudioContext || (window as any).webkitAudioContext).prototype.decodeAudioData.call(
        (this.audioContext || new (window.AudioContext || (window as any).webkitAudioContext)()),
        arrayBuffer.slice(0)
      );
    });

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
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Resume context if needed
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }
    // Wait for all buffers to load
    await Promise.all(this.loadingBuffers);
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
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startSequencer();
    } else {
      this.stopSequencer();
    }
  }

  startSequencer() {
    this.stopSequencer();
    this.currentStep = 0;
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    this.audioNextStepTime = this.audioContext.currentTime + 0.05;
    this.scheduleSteps(0); // pass starting step
  }

  scheduleSteps(schedulerStep: number) {
    const lookahead = 25; // ms
    const stepInterval = (60 / this.tempo) / 4; // seconds per step
    const scheduleAheadTime = 0.1; // seconds
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
    setTimeout(() => { this.currentStep = stepIdx; }, (time - this.audioContext!.currentTime) * 1000);
  }

  async playSoundAtTime(drum: { sound: string }, time: number) {
    await this.ensureAudioContext();
    const ctx = this.audioContext!;
    const buffer = this.audioBuffers[drum.sound];
    if (!buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(time);
  }

  stopSequencer() {
    if (this.schedulerId) {
      clearTimeout(this.schedulerId);
      this.schedulerId = null;
    }
    this.currentStep = 0;
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
    let bytes = [];
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
    } catch (e) {
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

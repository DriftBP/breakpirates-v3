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
    { label: 'Hi-Hat', sound: 'hihat' },
    { label: 'Tom', sound: 'tom' },
    { label: 'Rim', sound: 'rim' },
    { label: 'Cowbell', sound: 'cowbell' }
  ];

  steps = Array(32).fill(0);
  sequence: boolean[][] = this.drums.map(() => Array(32).fill(false));
  currentStep = 0;
  isPlaying = false;
  tempo = 120;

  private audioElements: { [key: string]: HTMLAudioElement } = {};
  private intervalId: any = null;
  private lastTempo: number = this.tempo;

  playSound(drum: { sound: string }) {
    if (!this.audioElements[drum.sound]) {
      this.audioElements[drum.sound] = new Audio(`/assets/808/${drum.sound}.wav`);
    }
    const audio = this.audioElements[drum.sound];
    audio.currentTime = 0;
    audio.play();
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
    this.intervalId = setInterval(() => {
      this.playCurrentStep();
      this.currentStep = (this.currentStep + 1) % this.steps.length;
    }, (60_000 / this.tempo) / 2);
  }

  stopSequencer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
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

  ngOnInit() {
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

  private _tempo: number;

  restartSequencer() {
    if (this.isPlaying) {
      this.startSequencer();
    }
  }
}

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
  // Classic 808 beat: Kick on 1, 9, 17, 25; Snare/Clap on 5, 13, 21, 29; Hi-Hat on all 32
  sequence: boolean[][] = [
    // Kick
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
    // Snare
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    // Clap
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    // Hi-Hat
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    // Tom
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Rim
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // Cowbell (add more hits)
    [true, false, false, false, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false],
  ];

  currentStep = 0;
  isPlaying = false;
  tempo = 120;
  private _tempo: number = 120;

  private audioElements: { [key: string]: HTMLAudioElement } = {};
  private intervalId: any = null;
  private lastTempo: number = this.tempo;

  sharedBeat: string = '';

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
    }, (60_000 / this.tempo) / 4); // Double the speed
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
}

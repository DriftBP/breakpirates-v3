import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private readonly audio: HTMLAudioElement = new Audio();

  constructor() {
    this.audio.preload = 'none';
  }

  load(url: string): void {
    this.audio.src = url;
  }

  play(): void {
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  public set volume(volume: number) {
    // Audio element volume is between 0 and 1
    this.audio.volume = volume / 100;
  }
}

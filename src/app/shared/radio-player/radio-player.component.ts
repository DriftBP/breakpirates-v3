import { Component, OnInit } from '@angular/core';
import { faPause, faPlay, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { AppSettings } from '../../app-settings';
import { AudioService } from '../services/audio/audio.service';

@Component({
  selector: 'bp-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent implements OnInit {
  private lastVolume: number;

  playing = false;
  muted = false;
  volume = 100;

  faPlay = faPlay;
  faPause = faPause;
  faVolumeUp = faVolumeUp;
  faVolumeMute = faVolumeMute;

  constructor(private readonly audioService: AudioService) {
    this.lastVolume = this.volume;
  }

  ngOnInit() {
    this.audioService.load(AppSettings.STREAM_URL_PRIMARY);
  }

  togglePlay() {
    if (this.playing) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }

    this.playing = !this.playing;
  }

  toggleMute() {
    if (this.muted) {
      this.volume = this.lastVolume;
      this.audioService.volume = this.volume;
    } else {
      this.volume = 0;
      this.audioService.volume = 0;
    }

    this.muted = !this.muted;
  }

  onVolumeSet() {
    this.lastVolume = this.volume;
    this.audioService.volume = this.volume;
    this.muted = false;
  }
}

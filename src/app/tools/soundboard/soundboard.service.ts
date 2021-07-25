import { Injectable } from '@angular/core';

import { AppSettings } from '../../app-settings';
import { SampleConfig } from './sample-config';

@Injectable()
export class SoundboardService {
  private sounds: { [id: number]: HTMLAudioElement } = {};

  constructor() {}

  initialise(configs: SampleConfig[]) {
    configs.forEach(c => {
      let audio = new Audio(AppSettings.ASSET_SHOW_SOUND + c.file);
      audio.loop = c.loop;
      audio.title = c.name;

      this.sounds[c.id] = audio;
    });
  }

  play(id: number) {
    const sound = this.sounds[id];

    if (sound.loop) {
      // Looped sounds
      if (sound.paused) {
        sound.play();
      } else {
        sound.pause();
        sound.currentTime = 0;
      }
    } else {
      // Single shot
      if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
      }

      sound.play();
    }
  }
}

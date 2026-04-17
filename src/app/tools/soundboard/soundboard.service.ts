import { Injectable, signal } from '@angular/core';

import { AppSettings } from '../../app-settings';
import { SampleConfig } from './sample-config';

@Injectable()
export class SoundboardService {
  private sounds: { [id: number]: HTMLAudioElement } = {};

  private _isLoaded = signal<boolean>(false);
  public readonly isLoaded = this._isLoaded.asReadonly();

  initialise(baseDir: string, configs: SampleConfig[]) {
    let samplesLoaded = 0;
    this._isLoaded.set(false);

    configs.forEach(c => {
      let audio = new Audio(`${AppSettings.ASSET_SHOW_SOUND}${baseDir}/${c.file}`);
      audio.loop = c.loop;
      audio.title = c.name;
      audio.preload = 'auto';

      audio.addEventListener('canplaythrough', () => {
        samplesLoaded++;

        if (samplesLoaded == configs.length) {
          this._isLoaded.set(true);
        }
      }, false);

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

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// mediaelement removed in favor of Plyr. Plyr/Hls are initialized where the player is used.

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import { Injectable } from '@angular/core';

import { AppSettings } from '../appSettings';

@Injectable()
export class TuneInService {

  constructor() { }

  archiveUrl: string = AppSettings.ARCHIVE_URL;
}

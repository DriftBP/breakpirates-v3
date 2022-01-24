import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SampleConfig } from './sample-config';
import { SoundboardService } from './soundboard.service';
import { AppSettings } from '../../../app/app-settings';

export abstract class SoundboardBase {
  abstract breadcrumbConfig: BreadcrumbConfigItem[];

  imagePath: string;
  configs: SampleConfig[] = [];
  loaded = false;

  constructor(
    readonly breadcrumbService: BreadcrumbService,
    readonly soundboardService: SoundboardService
  ) {}

  initialise(baseDir: string, image: string, sampleConfigs: SampleConfig[]):void {
    this.imagePath = `url('${AppSettings.ASSET_SHOW_SOUND}${baseDir}/${image}')`;
    this.configs = sampleConfigs;
    this.soundboardService.initialise(baseDir, sampleConfigs);

    this.soundboardService.isLoaded$.subscribe((loaded) => this.loaded = loaded);
  }

  onButtonClick(id: number) {
    this.soundboardService.play(id);
  }
}

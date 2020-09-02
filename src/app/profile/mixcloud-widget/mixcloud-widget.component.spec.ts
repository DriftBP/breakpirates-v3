import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { MixcloudWidgetComponent } from './mixcloud-widget.component';
import { ProfileModule } from '../profile.module';

describe('MixcloudWidgetComponent', () => {
  let shallow: Shallow<MixcloudWidgetComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(MixcloudWidgetComponent, ProfileModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

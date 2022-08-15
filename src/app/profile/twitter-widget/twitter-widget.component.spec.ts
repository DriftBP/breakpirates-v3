import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { TwitterWidgetComponent } from './twitter-widget.component';
import { ProfileModule } from '../profile.module';

describe('TwitterWidgetComponent', () => {
  let shallow: Shallow<TwitterWidgetComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(TwitterWidgetComponent, ProfileModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

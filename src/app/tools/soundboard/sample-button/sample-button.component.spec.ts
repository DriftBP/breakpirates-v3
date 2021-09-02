import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SampleButtonComponent } from './sample-button.component';
import { SoundboardModule } from './../soundboard.module';

describe('SampleButtonComponent', () => {
  let shallow: Shallow<SampleButtonComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(SampleButtonComponent, SoundboardModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SoundboardComponent } from './soundboard.component';
import { SoundboardModule } from './soundboard.module';

describe('SoundboardComponent', () => {
  let shallow: Shallow<SoundboardComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(SoundboardComponent, SoundboardModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

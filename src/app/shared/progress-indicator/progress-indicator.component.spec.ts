import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ProgressIndicatorComponent } from './progress-indicator.component';
import { SharedModule } from '../shared.module';

describe('ProgressIndicatorComponent', () => {
  let shallow: Shallow<ProgressIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ProgressIndicatorComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

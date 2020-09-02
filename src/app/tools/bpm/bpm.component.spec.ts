import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { BpmComponent } from './bpm.component';
import { ToolsModule } from '../tools.module';

describe('BpmComponent', () => {
  let shallow: Shallow<BpmComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(BpmComponent, ToolsModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

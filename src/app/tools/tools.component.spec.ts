import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ToolsComponent } from './tools.component';
import { ToolsModule } from './tools.module';

describe('ToolsComponent', () => {
  let shallow: Shallow<ToolsComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ToolsComponent, ToolsModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

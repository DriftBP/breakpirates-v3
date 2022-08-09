import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ThemeSelectComponent } from './theme-select.component';
import { SharedModule } from '../shared.module';

describe('ThemeSelectComponent', () => {
  let shallow: Shallow<ThemeSelectComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ThemeSelectComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

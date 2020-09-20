import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../shared.module';

describe('DialogComponent', () => {
  let shallow: Shallow<DialogComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(DialogComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

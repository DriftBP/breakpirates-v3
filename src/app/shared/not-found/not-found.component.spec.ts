import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { NotFoundComponent } from './not-found.component';
import { SharedModule } from '../shared.module';

describe('NotFoundComponent', () => {
  let shallow: Shallow<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NotFoundComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ContentBoxComponent } from './content-box.component';
import { SharedModule } from '../shared.module';

describe('ContentBoxComponent', () => {
  let shallow: Shallow<ContentBoxComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ContentBoxComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

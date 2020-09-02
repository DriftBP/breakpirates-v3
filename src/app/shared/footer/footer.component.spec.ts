import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { FooterComponent } from './footer.component';
import { SharedModule } from '../shared.module';

describe('FooterComponent', () => {
  let shallow: Shallow<FooterComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(FooterComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

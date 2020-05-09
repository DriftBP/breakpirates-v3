import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { MobileComponent } from './mobile.component';
import { MobileModule } from './mobile.module';

describe('MobileComponent', () => {
  let shallow: Shallow<MobileComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(MobileComponent, MobileModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

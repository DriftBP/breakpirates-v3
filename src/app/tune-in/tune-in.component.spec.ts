import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { TuneInComponent } from './tune-in.component';
import { SharedModule } from '../shared/shared.module';

describe('TuneInComponent', () => {
  let shallow: Shallow<TuneInComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(TuneInComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

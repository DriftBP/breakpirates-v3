import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared.module';

describe('NavigationComponent', () => {
  let shallow: Shallow<NavigationComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(NavigationComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

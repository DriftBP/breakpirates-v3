import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SidebarComponent } from './sidebar.component';
import { SharedModule } from '../shared.module';

describe('SidebarComponent', () => {
  let shallow: Shallow<SidebarComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(SidebarComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

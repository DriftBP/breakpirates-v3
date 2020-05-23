import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { BreadcrumbComponent } from './breadcrumb.component';
import { SharedModule } from '../shared.module';

describe('BreadcrumbComponent', () => {
  let shallow: Shallow<BreadcrumbComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(BreadcrumbComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

import { Shallow } from 'shallow-render/dist/lib/shallow';

import { BreadcrumbService } from './breadcrumb.service';
import { SharedModule } from '../../shared.module';

describe('BreadcrumbService', () => {
  let shallow: Shallow<BreadcrumbService>;

  beforeEach(() => {
    shallow = new Shallow(BreadcrumbService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});

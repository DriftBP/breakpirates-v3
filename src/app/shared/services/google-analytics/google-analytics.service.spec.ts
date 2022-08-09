import { Shallow } from 'shallow-render/dist/lib/shallow';

import { GoogleAnalyticsService } from './google-analytics.service';
import { SharedModule } from '../../shared.module';

describe('GoogleAnalyticsService', () => {
  let shallow: Shallow<GoogleAnalyticsService>;

  beforeEach(() => {
    shallow = new Shallow(GoogleAnalyticsService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});

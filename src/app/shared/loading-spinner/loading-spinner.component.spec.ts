import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import { SharedModule } from '../shared.module';

describe('LoadingSpinnerComponent', () => {
  let shallow: Shallow<LoadingSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(LoadingSpinnerComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

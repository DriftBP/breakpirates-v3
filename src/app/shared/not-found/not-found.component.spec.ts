import { waitForAsync } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render';

import { NotFoundComponent } from './not-found.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [];

describe('NotFoundComponent', () => {
  let shallow: Shallow<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NotFoundComponent, SharedModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

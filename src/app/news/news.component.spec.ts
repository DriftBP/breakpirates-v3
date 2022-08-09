import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsModule } from './news.module';
import { NewsComponent } from './news.component';

const routes: Routes = [];

describe('NewsComponent', () => {
  let shallow: Shallow<NewsComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NewsComponent, NewsModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

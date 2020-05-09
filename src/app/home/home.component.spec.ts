import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';

describe('HomeComponent', () => {
  let shallow: Shallow<HomeComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(HomeComponent, HomeModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});


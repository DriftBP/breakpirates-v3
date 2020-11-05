import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Show } from '../schedule/show';

const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00',
  end_time: '01:00',
  day_id: 1,
  description: 'descripion',
  genres: [],
  hosts: []
};

describe('HomeComponent', () => {
  let shallow: Shallow<HomeComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HomeComponent, HomeModule)
      .mock(ScheduleService, {
        shows: () => of([ mockShow ]),
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import FollowingComponent from './following.component';
import { MockTranslateService } from '../../../test/services/mock.translate.service';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';

describe('FollowingComponent', () => {
  let component: FollowingComponent;
  let fixture: ComponentFixture<FollowingComponent>;

  beforeEach(() => {
    localStorage.setItem('bp_followed_profiles', '[2]');
    TestBed.configureTestingModule({
      imports: [FollowingComponent, TranslatePipe],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: BreadcrumbService, useClass: MockBreadcrumbService }
      ]
    });
    fixture = TestBed.createComponent(FollowingComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.removeItem('bp_followed_profiles');
    TestBed.resetTestingModule();
  });

  it('shows followed profiles and only their shows', () => {
    fixture.componentRef.setInput('profiles', [
      { id: 1, name: 'Other DJ', biog: null, image: null, location: null, mixcloud: null, twitter: null },
      { id: 2, name: 'Followed DJ', biog: null, image: null, location: null, mixcloud: null, twitter: null }
    ]);
    fixture.componentRef.setInput('shows', [
      { id: 1, title: 'Followed show', start_time: '', end_time: '', day_id: 1, hosts: [{ id: 2, name: 'Followed DJ' }], genres: [] },
      { id: 2, title: 'Other show', start_time: '', end_time: '', day_id: 2, hosts: [{ id: 1, name: 'Other DJ' }], genres: [] }
    ]);

    expect(component.followedProfiles().map(profile => profile.id)).toEqual([2]);
    expect(component.followedShows().map(show => show.id)).toEqual([1]);
  });
});

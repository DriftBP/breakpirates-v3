import { Component, OnInit, input } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Host } from './host';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { SortOrder } from '../shared/pipes/sort-order';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { SortByPipe } from '../shared/pipes/sort-by.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'bp-profile',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  imports: [
    ProfileButtonComponent,
    SortByPipe,
    FontAwesomeModule,
    TranslateModule
  ],
  standalone: true
})
export class ProfilesComponent implements OnInit {
  profiles = input.required<Host[]>();

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigActive
  ];

  orders = SortOrder;
  order = SortOrder.Ascending;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  toggleOrderBy(): void {
    this.order = this.order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
  }
}

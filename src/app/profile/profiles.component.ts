import { Component, OnInit, input, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Host } from './host';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { SortOrder } from '../shared/pipes/sort-order';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SortByPipe } from '../shared/pipes/sort-by.pipe';

@Component({
    selector: 'bp-profile',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss'],
    imports: [
        FontAwesomeModule,
        TranslatePipe,
        ProfileButtonComponent,
        SortByPipe
    ]
})
export default class ProfilesComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  profiles = input.required<Host[]>();

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigActive
  ];

  orders = SortOrder;
  order = SortOrder.Ascending;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  toggleOrderBy(): void {
    this.order = this.order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
  }
}

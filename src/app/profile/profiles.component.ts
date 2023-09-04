import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Host } from './host';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { SortOrder } from '../shared/pipes/sort-order';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-profile',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  @Input() profiles?: Host[];

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

  trackByFn(index: any, item: any): number {
    return item.id;
  }

}

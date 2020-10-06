import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Host } from './host';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { SortOrder } from '../shared/pipes/sort-order';

@Component({
  selector: 'app-profile',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profiles: Host[];
  orders = SortOrder;
  order = SortOrder.Ascending;
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigActive
  ];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profiles = this.route.snapshot.data['profiles'];
  }

  toggleOrderBy(): void {
    this.order = this.order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
  }

  trackByFn(index, item: Host): number {
    return item.id;
  }

}

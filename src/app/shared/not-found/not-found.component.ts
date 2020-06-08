import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { BreadcrumbConfigItem } from '../breadcrumb/breadcrumb-config-item';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    {
      name: '404',
      isActive: true
    }
  ];
  path: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.pipe(take(1))
      .subscribe((data: { path: string }) => {
        this.path = data.path;
      });
  }
}

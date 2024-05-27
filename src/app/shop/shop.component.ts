import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { shopConfigActive, shopConfigInactive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { ProductType } from './models/product-type';
import { ProductTypeModel } from './models/product-type-model';
import { defaultProductType } from './services/product-types';

@Component({
  selector: 'bp-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit, OnDestroy {
  types = input.required<ProductTypeModel[]>();

  private childParamsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];
  private defaultType = defaultProductType;

  activetype: ProductType;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly translateService: TranslateService
  ) {
    this.activetype = this.defaultType;
  }

  ngOnInit() {
    this.childParamsSubscription = this.router.events.pipe(filter(e => e instanceof NavigationEnd),
      startWith(undefined),
      switchMap(e => this.activatedRoute.firstChild?.paramMap)).subscribe(params => {
        this.onParamChange(params);
    });
  }

  onParamChange(params: ParamMap) {
    const type = params.get('type');

    if (type) {
      this.activetype = parseInt(type);

      const typeName = this.getTypeName(this.activetype);

      this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
        shopConfigInactive,
        {
          name: typeName,
          isActive: true
        }
      ]);
    } else {
      this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
        shopConfigActive
      ]);

      this.activetype = this.defaultType;
    }

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  ngOnDestroy() {
    if (this.childParamsSubscription) {
      this.childParamsSubscription.unsubscribe();
    }
  }

  private getTypeName(type: ProductType): string {
    const activeType = this.types().find(t => t.id === type);

    if (activeType) {
      return this.translateService.instant(activeType.name);
    }

    return '';
  }
}

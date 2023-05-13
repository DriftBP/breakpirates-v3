import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bp-product-type',
  templateUrl: './product-type.component.html'
})
export class ProductTypeComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;

  products: string[];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ products }) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}

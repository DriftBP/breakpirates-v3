import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bp-product-type',
  templateUrl: './product-type.component.html'
})
export class ProductTypeComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;

  products: string[];

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.products = this.route.snapshot.data['products'];
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}

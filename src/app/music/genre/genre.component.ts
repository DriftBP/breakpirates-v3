import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Genre } from '../genre';
import { Show } from '../../schedule/show';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute
  ) { }

  private paramsSubscription: Subscription;

  genre: Genre;
  shows: Show[];

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(() => {
      this.initialiseState();
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  initialiseState(): void {
    this.genre = this.route.snapshot.data['genre'];
    this.shows = this.route.snapshot.data['shows'];
  }

}

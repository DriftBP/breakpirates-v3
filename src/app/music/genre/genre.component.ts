import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from '../genre';
import { Show } from '../../schedule/show';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  genre: Genre;
  shows: Show[];

  ngOnInit() {
    this.genre = this.route.snapshot.data['genre'];
    this.shows = this.route.snapshot.data['shows'];
  }

}

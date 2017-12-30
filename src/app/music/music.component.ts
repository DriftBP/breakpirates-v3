import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from './genre';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  genres: Genre[];

  ngOnInit() {
    this.genres = this.route.snapshot.data['genres'];
  }

}

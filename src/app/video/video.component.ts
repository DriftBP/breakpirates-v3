import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from './video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  videos: Video[];

  ngOnInit() {
    this.videos = this.route.snapshot.data['videos'];
  }

}

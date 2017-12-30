import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from '../video';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  video: Video;

  ngOnInit() {
    this.video = this.route.snapshot.data['video'];
  }

}

import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  host: { class: 'post col-xl-6' },
})
export class PostCardComponent implements OnInit {
  @Input() post: BlogPost;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {
  posts: Array<BlogPost> = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(1, null, null).subscribe((posts) => {
      this.posts = posts.slice(0, 3);
    });
  }
}

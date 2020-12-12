import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent implements OnInit, OnDestroy {
  blogPosts: Array<BlogPost> = [];
  querySub: any;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.querySub = this.postService.getAllPosts().subscribe((data) => {
      this.blogPosts = data;
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  rowClicked(e: Event, id: number) {
    this.router.navigate(['/edit-post', id]);
  }
}

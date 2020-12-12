import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub;
  blogPosts: Array<BlogPost>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe((params) => {
      if (params['tag']) {
        this.tag = params['tag'];
        this.category = null;
      } else {
        this.tag = null;
      }

      if (params['category']) {
        this.category = params['category'];
        this.tag = null;
      } else {
        this.category = null;
      }

      this.getPage(+params['page'] || 1);
    });
  }

  ngOnDestory(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  getPage(num: number): void {
    this.postService
      .getPosts(num, this.tag, this.category)
      .subscribe((posts) => {
        if (posts.length > 0) {
          this.page = num;

          // update URL query param to show current page
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: this.page },
            queryParamsHandling: 'merge',
          });

          this.blogPosts = posts;
        }
      });
  }
}

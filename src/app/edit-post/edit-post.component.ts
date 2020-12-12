import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost;
  tags: string;
  querySub: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.querySub = this.postService.getPostsById(id).subscribe((data) => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  formSubmit() {
    // update blogPost object with updated tags before calling API
    this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());

    this.postService
      .updatePostById(this.blogPost._id, this.blogPost)
      .subscribe((data) => {
        this.router.navigate(['/admin']);
      });
  }

  deletePost(id: string) {
    this.postService.deletePostById(id).subscribe((data) => {
      this.router.navigate(['/admin']);
    });
  }
}

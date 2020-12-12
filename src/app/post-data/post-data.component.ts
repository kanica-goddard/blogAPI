import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { Comment } from '../Comment';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.scss'],
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.postService.getPostsById(params['id']).subscribe((post) => {
        this.post = post;
        this.post.views = this.post.views + 1;
        this.postService.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  ngOnDestory(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  submitComment() {
    const comment: Comment = {
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    };

    // add to current object for instant display
    this.post.comments.push(comment);

    // update server
    this.postService
      .updatePostById(this.post._id, this.post)
      .subscribe((data) => {
        // reset form
        this.commentName = '';
        this.commentText = '';
      });
  }
}

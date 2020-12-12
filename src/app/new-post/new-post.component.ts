import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost = <BlogPost>{};
  tags: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  formSubmit() {
    // prevent empty string being added to tags array
    let tagsArray: string[] = [];
    if (this.tags.length > 0) {
      tagsArray = this.tags.split(',').map((tag) => tag.trim());
    }

    // update blogPost object before calling API
    this.blogPost = {
      ...this.blogPost,
      tags: tagsArray,
      isPrivate: false,
      postDate: new Date().toLocaleDateString(),
      postedBy: 'WEB422 Student',
      views: 0,
    };

    this.postService.newPost(this.blogPost).subscribe((data) => {
      this.router.navigate(['/admin']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: string[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }
}

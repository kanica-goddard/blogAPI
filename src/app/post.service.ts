import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BlogPost } from './BlogPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private perPage: number = 6;
  private urlBase: string = 'https://a5-blog.herokuapp.com';
  constructor(private http: HttpClient) {}

  getPosts(
    page: number,
    tag: string,
    category: string
  ): Observable<BlogPost[]> {
    // build base URL
    let url = `${this.urlBase}/api/posts?page=${page}&perPage=${this.perPage}`;

    // add tag to URL (remove #)
    if (tag) {
      tag.replace('#', '');
      url += `&tag=${tag}`;
    }

    // add category to URL
    if (category) {
      url += `&category=${category}`;
    }

    return this.http.get<BlogPost[]>(url);
  }

  getAllPosts(): Observable<BlogPost[]> {
    // build base URL
    let url = `${this.urlBase}/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`;

    return this.http.get<BlogPost[]>(url);
  }

  getPostsById(id: string): Observable<BlogPost> {
    // build base URL
    const url = `${this.urlBase}/api/posts/${id}`;

    return this.http.get<BlogPost>(url);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.urlBase}/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/api/tags`);
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/api/posts/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostInterface } from '../interfaces/create-post.interface';
import { GetPostInterace } from '../interfaces/get-post.interface';
import { ResponsePostInterface } from '../interfaces/response-post.interface';
import { PostInterface} from '../interfaces/post.interface';
import { CreateCommentInterface } from '../interfaces/create-comment.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = 'http://localhost:8080/api/posts';

  urlComment = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  addPost(data: CreatePostInterface): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.url}`, data, { headers });
  }

  getAllPost(data: GetPostInterace): Observable<ResponsePostInterface> {
    return this.http.get<ResponsePostInterface>(`${this.url}?page=${data.page}&size=${data.size}`);
  }

  getPost(id: string): Observable<PostInterface> {
    return this.http.get<PostInterface>(`${this.url}/${id}`);
  }

  addComment(data: CreateCommentInterface): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.urlComment}`, data, { headers });
  }
}

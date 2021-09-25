import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  URL =  'https://findmypetapi.herokuapp.com/post';
  token = localStorage.getItem('userToken')

  createPost(post): Observable<Post>  {
    const body = post;
    const reqHeader = new HttpHeaders({'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.post<Post>(this.URL, body);
  }

  updatePost(post: Post): Observable<Post>  {
    const body: Post = {
      title: post.title,
      description: post.description,
      status: post.status
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.put<Post>(`${this.URL}/${post.id}`, body, {headers : reqHeader});
  }

  getPosts(): Observable<Post[]> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Post[]>(this.URL, {headers : reqHeader});
  }

  getPost(id): Observable<Post> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Post>(`${this.URL}/${id}`, {headers : reqHeader});
  }

  getPostOfUser(): Observable<Post[]> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Post[]>(`${this.URL}/user`, {headers : reqHeader});
  }
}

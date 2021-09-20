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

  createPost(post: Post): Observable<Post>  {
    const body: Post = {
      title: post.title,
      description: post.description,
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.post<Post>(this.URL + 'post', body, {headers : reqHeader});
  }

  getPosts(): Observable<Post[]> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Post[]>(this.URL, {headers : reqHeader});
  }

  getPost(id): Observable<Post> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Post>(`${this.URL}/${id}`, {headers : reqHeader});
  }
}

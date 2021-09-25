import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentt } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  URL =  'https://findmypetapi.herokuapp.com/comment';
  token = localStorage.getItem('userToken');

  getComments(post_id): Observable<Commentt[]> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Commentt[]>(`${this.URL}/${post_id}`, {headers : reqHeader});
  }

  postComments(comment): Observable<Commentt> {
    const body: Commentt = {
      comment_text: comment.comment_text
    }
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.httpClient.post<Commentt>(`${this.URL}/${comment.post_id}`, body, {headers : reqHeader});
  }
}

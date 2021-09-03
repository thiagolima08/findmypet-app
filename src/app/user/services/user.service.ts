import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL_USERS = 'https://my-json-server.typicode.com/thiagolima08/planeerrija/users/';
  URL_USERS =  'https://plannerrijabackend.herokuapp.com/';
  // URL_USERS = 'http://localhost:3000/users/';

  constructor(private httpClient: HttpClient) {}

  registerUser(user: User): Observable<User>  {
    const body: User = {
      name: user.name,
      password: user.password,
      email: user.email
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.httpClient.post<User>(this.URL_USERS + 'employee', body, {headers : reqHeader});
  }

  userAuthentication(userEmail, password): Observable<User>  {
    const data = {
      email: userEmail,
      password
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.httpClient.post<User>(this.URL_USERS + 'session', data, { headers: reqHeader });
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL_USERS);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.URL_USERS}${id}`);
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.URL_USERS}${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<User>(`${this.URL_USERS}${id}`);
  }

}

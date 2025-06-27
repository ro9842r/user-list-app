import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../components/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(map((result) => result));
  }
}

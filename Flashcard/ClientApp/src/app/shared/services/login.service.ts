import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  login(username: string, password: string): Observable<void> {
    return this.http.post<void>(`/Authentication/AuthenticateUser?username=${username}`, {
      password: password
    });
  }

  logout(): Observable<void> {
    return this.http.get<void>(`/Authentication/Signout`);
  }
}

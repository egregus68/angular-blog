import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginInterface } from '../interfaces/login.interface';
import { ResponseAuthInterface } from '../interfaces/response-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLogin$ = new BehaviorSubject<string | null>(null);
  private isLogged$ = new BehaviorSubject<boolean>(false);

  url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  login(data: LoginInterface): Observable<ResponseAuthInterface> {
    return this.http.post<ResponseAuthInterface>(`${this.url}authentication`, data).pipe(
      tap((response) => {
        this.userLogin$.next(response.claims.login);
        this.isLogged$.next(true);
      }),
    );
  }

  get UserInfo(): string {
    return this.userLogin$.getValue()!;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authLogin');
    this.userLogin$.next('');
    this.isLogged$.next(false);
  }
}

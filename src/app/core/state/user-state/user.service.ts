import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {User} from "../../http/user/models";
import {LoginResponse} from "../../http/auth/models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$ = new BehaviorSubject<User | null>(null);

  private isAuth$ = new BehaviorSubject<boolean>(false);

  set isAuth(value: boolean) {
    this.isAuth$.next(value);
  }

  set user(value: User) {
    this.user$.next(value);
  }

  get isAuthValue() {
    return this.isAuth$.value;
  }

  get accessToken() {
    return localStorage.getItem("access");
  }

  logOut$() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isAuth = false;
    return of(null);
  }

  login$(tokens: LoginResponse) {
    localStorage.setItem('access', tokens.accessToken);
    localStorage.setItem('refresh', tokens.refreshToken);
    this.isAuth = true;
    return of(null)
  }


  loadToken() {
    const token = localStorage.getItem('access');
    console.log(token);
    if (token) {
      this.isAuth = true;
    }
  }

  constructor() {
    this.loadToken()
  }

}

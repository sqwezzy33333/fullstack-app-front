import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {User} from "../../http/user/models";

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

  logOut$() {
    return of(null);
  }

}

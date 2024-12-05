import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, of, switchMap, tap} from "rxjs";
import {UserService} from "../../state/user-state/user.service";
import {HttpUserService} from "../../http/user/http-user.service";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class LoadEnvironmentService {



  async load() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<Record<string, string>>('./assets/environment.json')
        .pipe(
          finalize(() => resolve(true)),
          tap((config) => {
            this.configService.env = config
          }),
          switchMap(() =>
            this.userStateService.isAuthValue ? this.httpUserService.getMe$() : of(null)
          ),
          catchError((err) => this.userStateService.logOut$()),
          switchMap((user) => user ? of(user) : this.userStateService.logOut$())
        )
        .subscribe((user) => {
          if (!user) {
            return;
          }
          this.userStateService.user = user;
        })
    })
  }

  constructor(
    private httpClient: HttpClient,
    private userStateService: UserService,
    private httpUserService: HttpUserService,
    private configService: ConfigService,) {
  }
}

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../state/user-state/user.service";

export const noUserPageGuard: CanActivateFn = (route, state) => {
  const userStateService = inject(UserService);
  const router = inject(Router);

  if(userStateService.isAuthValue) {
    router.navigate(['dashboard']).then();
  }

  return true;
};

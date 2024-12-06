import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MENU_ROUTES} from "./constants";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {UserService} from "../../state/user-state/user.service";
import {DestroyService} from "../../../shared/services/destroy/destroy.service";
import {takeUntil} from "rxjs";
import {HttpAuthService} from "../../http/auth/http-auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePassComponent} from "./components/change-pass/change-pass.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatIcon,
    RouterLinkActive,
    RouterLink,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    AsyncPipe
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class NavigationComponent {
  readonly MENU_ROUTES = MENU_ROUTES;
  readonly dialog = inject(MatDialog);

  logOut() {
    this.userState.logOut$().pipe(takeUntil(this.destroy$)).subscribe(() => this.router.navigate(['./login']));
  }

  editPass() {
    this.dialog.open(ChangePassComponent, {
      width: '600px',
    })
  }

  get user$() {
    return this.userStateService.user$;
  }

  constructor(
    private router: Router,
    private userState: UserService,
    private destroy$: DestroyService,
    private userStateService: UserService,
  ) {
  }
}

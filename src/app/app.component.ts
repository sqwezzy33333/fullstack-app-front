import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserService} from "./core/state/user-state/user.service";
import {AsyncPipe} from "@angular/common";
import {NavigationComponent} from "./core/components/navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  get isAuth$() {
    return this.userService.isAuth$;
  }

  constructor(
    private userService: UserService,
  ) {
  }
}

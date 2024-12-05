import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatErrorExtComponent} from "../../../shared/component/mat-error-ext/mat-error-ext.component";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginUser} from "../../http/auth/models";
import {catchError, of, switchMap, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {displayFormErrors} from "../../../shared/utils";
import {filter} from "rxjs/operators";
import {HttpAuthService} from "../../http/auth/http-auth.service";
import {Router} from "@angular/router";
import {DestroyService} from "../../../shared/services/destroy/destroy.service";
import {UserService} from "../../state/user-state/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        MatButton,
        MatError,
        MatErrorExtComponent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: '../register/register.component.scss',
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  form = this.formBuilder.group(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }
  )

  login() {
    this.form.markAsTouched();
    if (!this.form.valid) {
      return
    }
    const user = this.form.value as LoginUser;
    this.authHttpService.login$(user).pipe(
      takeUntil(this.destroy$),
      catchError((response: HttpErrorResponse) => {
        displayFormErrors(response, this.form);
        return of(null);
      }),
      filter(Boolean),
      switchMap((response) => this.userStateService.login$(response))
    ).subscribe((response) => {
      this.router.navigate(['dashboard']).then()
    });
  }

  constructor(
    private authHttpService: HttpAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private destroy$: DestroyService,
    private userStateService: UserService,) {
  }
}

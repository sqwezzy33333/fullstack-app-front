import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {HttpAuthService} from "../../http/auth/http-auth.service";
import {RegisterUser} from "../../http/auth/models";
import {DestroyService} from "../../../shared/services/destroy/destroy.service";
import {catchError, of, takeUntil} from "rxjs";
import {filter} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {MatErrorExtComponent} from "../../../shared/component/mat-error-ext/mat-error-ext.component";
import {displayFormErrors} from "../../../shared/utils";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatErrorExtComponent,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [
    DestroyService
  ]
})
export class RegisterComponent {

  form = this.formBuilder.group(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      forName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    }
  )

  register() {
    this.form.markAsTouched();
    if (!this.form.valid) {
      return
    }
    const user = this.form.value as RegisterUser;
    this.authHttpService.register$(user).pipe(
      takeUntil(this.destroy$),
      catchError((response: HttpErrorResponse) => {
        displayFormErrors(response, this.form);
        return of(null);
      }),
      filter(Boolean)
    ).subscribe((response) => {
      this.notificationService.display('Регистрация завершена', 'success')
      this.router.navigate(['login']).then()
    });
  }

  constructor(
    private authHttpService: HttpAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private destroy$: DestroyService,
    private notificationService: NotificationService) {
  }

}

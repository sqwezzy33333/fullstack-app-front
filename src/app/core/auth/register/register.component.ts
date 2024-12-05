import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {HttpUserService} from "../../http/user/http-user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {HttpAuthService} from "../../http/auth/http-auth.service";
import {RegisterUser} from "../../http/auth/models";
import {DestroyService} from "../../../shared/services/destroy/destroy.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.authHttpService.register$(user).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      console.log(response);
    });
  }

  constructor(
    private authHttpService: HttpAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private destroy$: DestroyService,) {
  }

}

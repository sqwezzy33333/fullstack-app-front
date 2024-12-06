import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatErrorExtComponent} from "../../../../../shared/component/mat-error-ext/mat-error-ext.component";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpAuthService} from "../../../../http/auth/http-auth.service";
import {ChangePassword} from "../../../../http/auth/models";
import {DestroyService} from "../../../../../shared/services/destroy/destroy.service";
import {catchError, of, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {displayFormErrors} from "../../../../../shared/utils";
import {filter} from "rxjs/operators";
import {NotificationService} from "../../../../services/notification/notification.service";
import {MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatErrorExtComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class ChangePassComponent {

  form = this.formBuilder.group({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  })

  save() {
    this.form.markAsTouched();
    if (this.form.invalid) {
      return
    }
    const payload = this.form.value as ChangePassword;

    this.httpAuthService.changePass$(payload).pipe(
      takeUntil(this.destroy$),
      catchError((response: HttpErrorResponse) => {
        displayFormErrors(response, this.form);
        return of(null);
      }),
      filter(Boolean)).subscribe((response) => {
      this.notificationService.display('Пароль изменен', 'success', 3000);
      this.dialogRef.close();
    })
  }

  constructor(
    private formBuilder: FormBuilder,
    private httpAuthService: HttpAuthService,
    private destroy$: DestroyService,
    private notificationService: NotificationService,
    private dialogRef: DialogRef
  ) {
  }
}

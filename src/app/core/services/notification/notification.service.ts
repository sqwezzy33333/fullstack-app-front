import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {NotificationComponent} from "../../../shared/component/notification/notification.component";

export type NotificationType = "success" | "info" | "warning" | "error";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  display(message: string, type: NotificationType, duration = 2000) {
    const config: MatSnackBarConfig = {
      data: {
        message,
        type,
      },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration,
      panelClass: [`snackbar`],
      politeness: 'off',
    };
    return this.snackBar.openFromComponent(NotificationComponent, config);
  }

  constructor(private snackBar: MatSnackBar) {}
}

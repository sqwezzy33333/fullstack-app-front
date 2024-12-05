import {Component, Inject, inject} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions, MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}

import {HttpErrorResponse, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {NotificationService} from "../notification/notification.service";
import {catchError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService)

  return next(req).pipe(catchError((errorResponse: any) => {
    const error = errorResponse.error;

    if (error.message && !error.additional?.length) {
      notificationService.display(error.message, 'error', 3000);
    }
    return next(errorResponse);
  }));
};

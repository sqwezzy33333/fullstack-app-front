import {ValidationError} from "../../core/http/models";
import {HttpErrorResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

export function displayFormErrors(response: HttpErrorResponse, form: FormGroup) {
  const formErrors = response?.error?.additional || [] as ValidationError[];

  if (formErrors.length) {
    formErrors.forEach((error: ValidationError) => {
      if (!error.field) {
        return
      }
      const control = form.get(error.field);
      control?.setErrors({
        server: error.message
      })
    })
  }
}

import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initApplication} from "./core/initialization";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {LoadEnvironmentService} from "./core/initialization/services/load-environment.service";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideAnimations} from "@angular/platform-browser/animations";
import {errorInterceptor} from "./core/services/interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [LoadEnvironmentService]
    },
    provideAnimationsAsync(),
    provideAnimations(),
  ]
};

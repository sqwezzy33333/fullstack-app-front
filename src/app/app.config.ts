import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {initApplication} from "./core/initialization";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {LoadEnvironmentService} from "./core/initialization/services/load-environment.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [LoadEnvironmentService]
    }
  ]
};

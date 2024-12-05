import {Routes} from '@angular/router';
import {NotFoundComponent} from "./core/pages/404/404.component";
import {jwtGuardGuard} from "./core/guards/jwt-guard.guard";
import {noUserPageGuard} from "./core/guards/no-user-page.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./core/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [jwtGuardGuard],
  },
  {
    title: "Регистрация",
    path: "register",
    loadComponent: () => import('./core/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [noUserPageGuard]
  },
  {
    title: "Авторизация",
    path: "login",
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [noUserPageGuard]
  },
  {
    path: "404",
    title: 'Page Not Found',
    loadComponent: () => import('./core/pages/404/404.component').then(m => m.NotFoundComponent),
    canActivate: [jwtGuardGuard],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

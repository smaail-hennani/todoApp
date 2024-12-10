import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {} from '@angular/common/http';
import { TodoService } from './core/services/todo.service';
import { AuthService } from '/Users/Nano/Desktop/AngularProject/todoApp/src/app/core/services/auth.service';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login | TodoApp',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./components/auth/login.component'),
  },
  {
    path: 'register',
    title: 'Register | TodoApp',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./components/auth/register.component'),
  },
  {
    path: 'todos',
    title: 'Todos | TodoApp',
    // canActivate: [()=> inject(TodoService).isLoggedIn()],
    canActivate: [authGuard],
    loadComponent: () => import('./components/todo/todo.component'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'todos',
    pathMatch: 'full'
  }
];

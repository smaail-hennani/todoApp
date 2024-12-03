import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './core/services/todo.service';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login | TodoApp',
    loadComponent: () => import('./components/auth/login.component'),
  },
  {
    path: 'register',
    title: 'Register | TodoApp',
    loadComponent: () => import('./components/auth/register.component'),
  },
  {
    path: 'todos',
    title: 'Todos | TodoApp',
    canActivate: [()=> inject(TodoService).isLoggedIn()],
    loadComponent: () => import('./components/todo/todo.component'),
  },
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'todos',
    pathMatch: 'full'
  }
];

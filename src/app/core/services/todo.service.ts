import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://api.example.com'; // Remplacez par l'URL de votre API
  private http = inject(HttpClient);
  private router = inject(Router);

  // Authentification utilisateur
  loggIn(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${email}`);
  }

  newUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('email')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // CRUD Todos
  newTodo(todo: Todo): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/todos`, todo);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  updateTodo(todo: Todo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/todos/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todos/${todo.id}`);
  }

  getTodosByUser(email: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`, { params: { userEmail: email } });
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://backend.osc-fr1.scalingo.io'; // Remplacez par l'URL de votre API
  private http = inject(HttpClient);
  private router = inject(Router);
  private todoSubject = new BehaviorSubject<Todo[]>([]); // Contient la liste des todos
  todos$ = this.todoSubject.asObservable(); // Observable pour accéder aux todos (encapsulation)

  // Charger les todos depuis le backend

  // Authentification utilisateur
  loggIn(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/login/${email}`);
  }

  newUser(user: User): Observable<{ message: string, userId: string }> {
    console.log('NewUser : ', user);
    return this.http.post<{ message: string, userId: string }>(`${this.apiUrl}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('email')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // CRUD Todos
  newTodo(todo: Todo): Observable<{ message: string, todoId: string }> {
    return this.http.post<{ message: string, todoId: string }>(`${this.apiUrl}/todos`, todo);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  updateTodo(todo: Todo): Observable<void> {
    console.log('Updating todo:', todo); // Log de l'objet envoyé
    return this.http.put<void>(`${this.apiUrl}/todos/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo): Observable<void> {
    if (!todo.id) {
      console.error('Erreur : ID non défini pour le todo', todo);
      throw new Error('ID non défini pour le todo');
    }
    return this.http.delete<void>(`${this.apiUrl}/todos/${todo.id}`);
  }

  getTodosByUser(email: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`, { params: { userEmail: email } });
  }

  loadTodos(email: string): void {
    this.http.get<Todo[]>(`${this.apiUrl}/todos`, { params: { userEmail: email } }).subscribe({
      next: (todos) => this.todoSubject.next(todos),
      error : (err) => console.error('Erreur lors du chargement des todos'),
    });
  }

  // Mettre à jour localement la liste des todos
  addLocal(todo: Todo): void{
    const todos = this.todoSubject.value;
    this.todoSubject.next([...todos, todo]);
  }

  removeLocal(todo: Todo): void {
    const todos = this.todoSubject.value.filter((t) => t.id !== todo.id);
    this.todoSubject.next(todos);
  }
}

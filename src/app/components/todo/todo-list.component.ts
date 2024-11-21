import { Component, inject } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { CommonModule } from '@angular/common';
import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- <div *ngFor="let user of users$ | async" class="user-todo-list">
      <h3>{{ user.email }}</h3> -->
      <!-- <div class="todo-card-container" *ngFor="let todo of todos$ | async"> -->
      <div class="todo-card-container" *ngFor="let todo of todos$ | async">
        <div class="todo-content">
          <input type="checkbox" name="done" [checked]="todo.done" (click)="updateTodo(todo)">
          <div class="title-desc" [ngClass]="{ done: todo.done }">
            <h4 class="title"> {{ todo.title }} </h4>
            <h5 class="description"> {{ todo.description }} </h5>
          </div>
        </div>

        <button class="delete-btn" (click)="deleteTodo(todo)"> Supprimer </button>
      </div>
    <!-- </div> -->
  `,
  styles: `
    .todo-card-container{
      width: clamp(80%, 5vw, 90%);
      max-width: 1200px;
      margin: 1rem auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      border: 1px #2828281a solid;
      padding: 1rem;
    }

    .todo-content{
      display: flex;
    }

    .title-desc > * {
      margin: 0.2rem;
      font-weight: normal;
    }

    .done {
      text-decoration: line-through;
    }

    input {
      width: 20px;
      margin-right: 1rem;
    }

    .delete-btn {
      padding: 0.5rem;
      border-radius: 8px;
      color: white;
      background: red;
      border: none;

      &:hover {
        cursor: pointer;
      }
    }
  `
})
export class TodoListComponent {
  private ts = inject(TodoService);
  // readonly todos$ = this.ts.getTodos();
  readonly users$ = this.ts.getUsers(); // Obtenir la liste des utilisateurs
  email = localStorage.getItem('email');
  readonly todos$ = this.ts.getTodosByUser(this.email!);

  updateTodo(todo: Todo){
    todo.done = !todo.done;
    this.ts.updateTodo(todo);
  }

  deleteTodo = (todo: Todo) => this.ts.deleteTodo(todo);
  getTodosByUser = (email: string) => this.ts.getTodosByUser(email);
}

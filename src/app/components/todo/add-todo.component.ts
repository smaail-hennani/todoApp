import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';
import { HttpClientModule } from '@angular/common/http';
import { ResponsiveService } from '../../core/services/responsive.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <form
      class="form-container2"
      [formGroup]="addTodoForm"
      (ngSubmit)="onSubmit()"
      [class]="layoutClass"
    >
      <input type="text" placeholder="Titre" formControlName="title">
      <input type="text" placeholder="Description" formControlName="description">
      <button
        class="auth-btn"
        [ngClass]="{'active-btn' : !addTodoForm.invalid }"
        [disabled]="addTodoForm.invalid"
        type="submit"
      >
        Ajouter
      </button>
    </form>
  `,
  styles: `
    .form-container2 {
      width: max-content;
      justify-content: center;
      border-radius: 8px;
      margin: 2rem auto;
      display: flex;
      padding: 0;
      border: none;
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);

      &.mobile-layout {
        max-width: 300px;
        padding: 1rem;
        font-size: 1.2em;
        margin: 50px auto;
        border: 1px grey solid;
      }
      & > * {
        margin: 0 0.5rem;
      }
    }
    input[type="text"] {
      width: auto;
    }
    .auth-btn {
      width: 100%;
      padding: 14px 20px;
      border-radius: 8px;
    }
  `
})
export class AddTodoComponent {
  private ts = inject(TodoService);
  private responsiveService = inject(ResponsiveService);

  addTodoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  get layoutClass() {
    if (this.responsiveService.isMobile) {
      return 'mobile-layout';
    }
    if (this.responsiveService.isTablet) {
      return 'tablet-layout';
    }
    return 'form-container2';
  }

  onSubmit(){
    const todo :Todo = {
      title: this.addTodoForm.value.title!,
      description: this.addTodoForm.value.description!,
      done: false,
      userEmail: localStorage.getItem('email')!
    };

    this.ts.newTodo(todo).subscribe({
      next: (response) => {
        const newTodo: Todo = {
          ...todo,
          id: response.todoId // Ajout de l'id retourné par le backend
        } as Todo;
        this.ts.addLocal(newTodo); // Ajouter localement le todo
        this.addTodoForm.reset();
      },
      error: (err) => console.error('Erreur lors de l\'ajout du todo:', err),
    });
  }
}

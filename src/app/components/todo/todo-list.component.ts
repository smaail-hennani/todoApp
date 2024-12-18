import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { CommonModule } from '@angular/common';
import { Todo } from '../../core/models/todo.model';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ResponsiveService } from '../../core/services/responsive.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <!-- <div *ngFor="let user of users$ | async" class="user-todo-list">
      <h3>{{ user.email }}</h3> -->
      <!-- <div class="todo-card-container" *ngFor="let todo of todos$ | async"> -->
      <div class="actions-container" [class]="layoutClass">
        <!-- Boutons de filtre -->
        <button (click)="filterTasks('all')">Toutes les tâches</button>
        <button (click)="filterTasks('done')">Tâches faites</button>
        <button (click)="filterTasks('notDone')">Tâches non faites</button>

        <!-- Bouton de tri -->
        <button (click)="sortTasks()">Trier par ordre croissant (non faites -> faites)</button>
      </div>
      <div class="todo-card-container" *ngFor="let todo of filteredTodos$ | async">
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
      background-color: var(--bg-task);
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
export class TodoListComponent implements OnInit {
  private ts = inject(TodoService);
  // readonly todos$ = this.ts.getTodos();
  readonly users$ = this.ts.getUsers(); // Obtenir la liste des utilisateurs
  // email = localStorage.getItem('email');
  // Méthode exécutée au démarrage du composant
  email: string | null = null; // Propriété pour stocker l'email
  // todos$ = this.ts.getTodosByUser(''); // Initialisation par défaut
  todos$ = this.ts.todos$;
  private filterSubject = new BehaviorSubject<'all' | 'done' | 'notDone'>('all');
  private sortSubject = new BehaviorSubject<boolean>(false);
  private responsiveService = inject(ResponsiveService);

  get layoutClass() {
    if (this.responsiveService.isMobile) {
      console.log('Is Mobile: ', this.responsiveService.isMobile);
      return 'mobile-layout';
    }
    if (this.responsiveService.isTablet) {
      console.log('Is Tablet: ', this.responsiveService.isTablet);
      return 'tablet-layout';
    }
    return 'action-container';
  }

  filteredTodos$ = combineLatest([this.todos$, this.filterSubject, this.sortSubject]).pipe(
    map(([todos, filter, sort]) => {
      let filtered = todos;

      // Filtrer les taches
      if (filter === 'done') {
        filtered = todos.filter(todo => todo.done);
      } else if (filter === 'notDone') {
        filtered = todos.filter(todo => !todo.done);
      }

      // Trier les tâches
      if (sort) {
        filtered = [...filtered].sort((a, b) => {
          if (a.done === b.done) {
            return 0; // Aucune modification si les deux ont le même état
          }
          return a.done ? 1 : -1; // Les non faites (false) passent avant les faites (true)
        });
      }

      return filtered;
    })
  )

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.email = localStorage.getItem('email');
      console.log('test email : ', this.email);
    } else {
      console.log('localStorage n\'est pas disponible');
    }

    // Récupération des todos si l'email est défini
    if (this.email) {
      console.log('test email2 : ', this.email);
      this.ts.loadTodos(this.email); // Charger les todos depuis le backend
      this.todos$ = this.ts.todos$; // S'abonner aux todos
      // this.todos$ = this.ts.getTodosByUser(this.email);

      // Abonnement pour afficher les données dans la console
      this.todos$.subscribe({
        next: (todos) => console.log('test todos : ', todos),
        error: (err) => console.error('Erreur lors de la récupération des todos :', err),
      });
    }
  }


  // readonly todos$ = this.ts.getTodosByUser(this.email!);

  updateTodo(todo: Todo) {
    todo.done = !todo.done; // Inverser l'état de `done`
    this.ts.updateTodo(todo).subscribe({
      next: () => console.log('Todo updated successfully:', todo),
      error: (err) => console.error('Error updating todo:', err),
    });
  }

  deleteTodo = (todo: Todo) => this.ts.deleteTodo(todo).subscribe({
    next: () => {
      console.log('Todo deleted successfully:', todo),
      // Mettre à jour localement la liste des todos
      this.ts.removeLocal(todo); // Supprimer localement le todo
      /*
      this.todos$ = this.todos$.pipe(
        map((todos) => todos.filter((t) => t.id !== todo.id)) // Supprimer le todo de la liste
      );
      */
    },
    error: (err) => console.error('Error delete todo:', err),
  });

  getTodosByUser = (email: string) => this.ts.getTodosByUser(email);

  // Méthode pour activer/désactiver le tri
  sortTasks(): void {
    this.sortSubject.next(!this.sortSubject.value); // Alterner l'état de tri
  }

  // Méthode pour changer le filtre
  filterTasks(filter: 'all' | 'done' | 'notDone'): void {
    this.filterSubject.next(filter);
  }
}

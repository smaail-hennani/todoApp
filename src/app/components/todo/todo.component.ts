import { Component, inject } from '@angular/core';
import { ToolbarComponent } from "../shared/toolbar.component";
import { TodoService } from '../../core/services/todo.service';
import { AddTodoComponent } from "./add-todo.component";
import { CommonModule } from '@angular/common';
import { TodoListComponent } from "./todo-list.component";
import {} from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, AddTodoComponent, TodoListComponent,
    /*
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule
  */
 ],
  template: `
    <app-toolbar [isLogoutBtnShown]="true"></app-toolbar>
    <app-add-todo></app-add-todo>
    <app-todo-list></app-todo-list>
  `,
  styles: ``
})
export default class TodoComponent {

}

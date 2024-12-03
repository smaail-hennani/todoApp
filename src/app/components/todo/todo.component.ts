import { Component, inject } from '@angular/core';
import { ToolbarComponent } from "../shared/toolbar.component";
import { TodoService } from '../../core/services/todo.service';
import { AddTodoComponent } from "./add-todo.component";
import { CommonModule } from '@angular/common';
import { TodoListComponent } from "./todo-list.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, AddTodoComponent, TodoListComponent, HttpClientModule],
  template: `
    <app-toolbar [isLogoutBtnShown]="true"></app-toolbar>
    <app-add-todo></app-add-todo>
    <app-todo-list></app-todo-list>
  `,
  styles: ``
})
export default class TodoComponent {

}

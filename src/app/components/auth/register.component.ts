import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';
import { User } from '../../core/models/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
    <app-toolbar [isLoginBtnShown]="true"></app-toolbar>
    <form [formGroup]="registerForm" class="form-container">
      <h2 class="title">Enregistrez-vous</h2>
      <h3 class="sub-title">
        Veuillez entrer votre email et mot de passe
        <br>
        <a routerLink="/login">Se connecter</a>
      </h3>
      <br />
      <input placeholder="Email" type="email" formControlName="email" />
      <input placeholder="Mot de passe" type="password" formControlName="password" />
      <button
        [ngClass]="{ 'active-btn' : !registerForm.invalid }"
        class="auth-btn"
        [disabled]="registerForm.invalid"
        (click)="OnSubmit()"
      >
      S'inscrire
      </button>
    </form>
  `,
  styles: `
  `
})
export default class RegisterComponent {
  private ts = inject(TodoService);
  private router = inject(Router);
  registerForm = new FormGroup ({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  async OnSubmit(){
    const user: User = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    localStorage.setItem('email', user.email);
    // await this.ts.newUser(user);
    this.ts.newUser(user).subscribe({
      next: (response) => {
        console.log('User ajouté avec succès:', user);
        /*
        const newTodo: Todo = {
          ...todo,
          id: response.todoId // Ajout de l'id retourné par le backend
        } as Todo;
        */
        console.log('Message : ', response.message);
        console.log('UserId : ', response.userId);
      }
    })
    this.router.navigateByUrl('/todos');

  }
}

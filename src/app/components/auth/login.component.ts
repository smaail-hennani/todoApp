import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../core/services/todo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterModule],
  template: `
    <app-toolbar [isRegisterBtnShown]="true" [isLoginBtnShown]="false" [isLogoutBtnShown]="false"></app-toolbar>
    <form class="form-container" [formGroup]="loginForm">
      <h2 class="title">Connectez-vous à Rikudo</h2>
      <h3 class="sub-title">
        Veuillez entrer votre email
        <a routerLink="/register">S'inscrire</a>
      </h3><br>
      <input type="email" placeholder="Email" formControlName="email">
      <input type="password" placeholder="Mot de passe" formControlName="password">
      <p *ngIf="showError">{{ errorMsg }}</p>
      <button
        class="auth-btn"
        [ngClass]="{'active-btn' : !loginForm.invalid }"
        [disabled]="loginForm.invalid"
        (click)="onSubmit()"
      >
        Connexion
      </button>
    </form>
  `,
  styles: [`
    /* Styles du formulaire */
    body {
      margin: 0;
      font-family: 'Arial', sans-serif;
      background-color: #e0e7ff; /* Bleu très clair */
    }

    .form-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 30px;
      background-color: #ffffff; /* Blanc */
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .title {
      color: #1e3c72; /* Même bleu que le début du dégradé de la toolbar */
      text-align: center;
      margin-bottom: 10px;
    }

    .sub-title {
      color: #2a5298; /* Même bleu que la fin du dégradé de la toolbar */
      text-align: center;
      margin-bottom: 20px;
    }

    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    input[type="email"]:focus,
    input[type="password"]:focus {
      border-color: #1e3c72; /* Bleu de la toolbar */
      outline: none;
    }

    .auth-btn {
      width: 100%;
      background-color: #e74c3c; /* Rouge des boutons de la toolbar */
      color: white;
      padding: 14px 20px;
      margin-top: 20px;
      border: none;
      border-radius: 4px;
      font-size: 1.1em;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;
    }

    .auth-btn:hover {
      background-color: #c0392b; /* Rouge foncé */
      transform: scale(1.02);
    }

    .auth-btn:disabled {
      background-color: #bdc3c7; /* Gris */
      cursor: not-allowed;
    }

    a {
      color: #e74c3c; /* Rouge des boutons */
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }

    p {
      color: #e74c3c; /* Rouge pour les messages d'erreur */
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export default class LoginComponent {
  showError = false;
  errorMsg = "Email ou mot de passe incorrect, veuillez vous inscrire";
  private ts = inject(TodoService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  async onSubmit() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    const user = await this.ts.loggIn(email);
    if (user?.email === email && user.password === password) {
      localStorage.setItem('email', email);
      this.router.navigateByUrl('/todos');
    } else {
      this.showError = true;
    }
  }
}

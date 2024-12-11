import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../core/services/todo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterModule, HttpClientModule],
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
  styles: [``]
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
    this.ts.loggIn(email, password).subscribe({
      //next: (user) => {
      next: (response) => {
        // if (user?.email === email && user.password === password) {
        const token = response.token; //
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          this.router.navigateByUrl('/todos');
        } else {
          this.showError = true;
        }
      },
      error: () => {
        this.showError = true;
      }
    });
  }
}

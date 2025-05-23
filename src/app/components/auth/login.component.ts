import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResponsiveService } from '../../core/services/responsive.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ToolbarComponent,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  template: `
    <app-toolbar
      [isRegisterBtnShown]="true"
      [isLoginBtnShown]="false"
      [isLogoutBtnShown]="false"
    ></app-toolbar>
    <form
      class="form-container"
      [formGroup]="loginForm"
      [class]="layoutClass"
      (ngSubmit)="onSubmit()"
    >
      <h2 class="title" [class]="layoutClass">Connectez-vous</h2>
      <h3 class="sub-title" [class]="layoutClass">
        Veuillez entrer votre email
        <a routerLink="/register" [class]="layoutClass">S'inscrire</a>
      </h3>
      <br>
      <input
        type="email"
        placeholder="Email"
        formControlName="email"
        [class]="layoutClass"
      >
      <input
        type="password"
        placeholder="Mot de passe"
        formControlName="password"
        [class]="layoutClass"
      >
      <p *ngIf="showError" [class]="layoutClass">{{ errorMsg }}</p>
      <button
        type="submit"
        id="login-button"
        class="auth-btn"
        [class]="layoutClass"
        [ngClass]="{'active-btn' : !loginForm.invalid }"
        [disabled]="loginForm.invalid"
      >
        Connexion
      </button>
    </form>
  `,
  styles: [``]
})
export default class LoginComponent {
  showError = false;
  errorMsg = 'Email ou mot de passe incorrect, veuillez vous inscrire';
  private authService = inject(AuthService);
  private router = inject(Router);
  private responsiveService = inject(ResponsiveService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  get layoutClass() {
    if (this.responsiveService.isMobile) {
      console.log('Is Mobile: ', this.responsiveService.isMobile);
      return 'mobile-layout';
    }
    if (this.responsiveService.isTablet) {
      console.log('Is Tablet: ', this.responsiveService.isTablet);
      return 'tablet-layout';
    }
    console.log('Is Desktop: ', this.responsiveService.isDesktop);
    return 'desktop-layout';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Ne fait rien si le formulaire est invalide
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        const token = response.token;
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

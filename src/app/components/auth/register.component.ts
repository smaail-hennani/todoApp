import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';
import { User } from '../../core/models/user.model';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ResponsiveService } from '../../core/services/responsive.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
    <app-toolbar [isLoginBtnShown]="true"></app-toolbar>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="form-container" [class]="layoutClass">
      <h2 class="title">Enregistrez-vous</h2>
      <h3 class="sub-title">
        Veuillez entrer votre email et mot de passe
        <br>
        <a routerLink="/login">Se connecter</a>
      </h3>
      <br/>
      <input placeholder="Email" type="email" formControlName="email" />
      <input placeholder="Mot de passe" type="password" formControlName="password" />
      <button
        [ngClass]="{ 'active-btn' : !registerForm.invalid }"
        class="auth-btn"
        [disabled]="registerForm.invalid"
        type="submit"
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
  private responsiveService = inject(ResponsiveService);
  registerForm = new FormGroup ({
    email:new FormControl('', [Validators.required, Validators.email]),
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

  onSubmit(){
    const user: User = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    this.ts.newUser(user).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Félicitations 🎉',
          html: `<p>Votre compte a été créé avec succès.</p><p>Vous serez redirigé sous peu.</p>`,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Super !',
          confirmButtonColor: '#4caf50',
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            this.router.navigateByUrl('/login');
          }
        });
      },
      error: (error) => {
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            html: `<p>L\'email est déjà utilisé.</p>`,
            confirmButtonText: 'Réessayer',
            confirmButtonColor: '#4caf50',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue. Veuillez réessayer.',
            confirmButtonText: 'Réessayer'
          });
        }
      }
    });
  }
}

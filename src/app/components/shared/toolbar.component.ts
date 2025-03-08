import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class='toolbar'>
      <a class='app-title' routerLink='/'>TodoApp</a>
      <button (click)='toggleTheme()' class='theme-toggle'>
        <span class='icon'>🌙</span>
      </button>

      <button
        class='toolbar-btn'
        routerLink='/register'
        *ngIf='isRegisterBtnShown'
      >
        S'inscrire
      </button>

      <button class='toolbar-btn'
        routerLink='/login'
        *ngIf='isLoginBtnShown'
      >
        Se connecter
      </button>

      <div class='avatar-logout-btn' *ngIf='isLogoutBtnShown'>
        <div class='user-avatar'>
          {{ firstEmailLetter![0] | uppercase }}
        </div>
        <button class='toolbar-btn' (click)='logout()'>Se déconnecter</button>
      </div>
    </nav>
  `,
  styles: [`
    .theme-toggle {
      position: fixed;
      top: 80px;
      left: 10px;
      background: transparent;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      z-index: 1000;
      &:hover{
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.9);
      }
    }

    .theme-toggle .icon {
      animation: rotate 0.5s ease-in-out;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    body.dark-theme .theme-toggle {
      background: linear-gradient(135deg, #333, #555);
      color: #ffd700;
    }

    .toolbar {
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(90deg, #1e3c72, #2a5298);
      padding: 0 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
    }

    .app-title {
      text-decoration: none;
      color: #ffffff;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .toolbar-btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      background: #e74c3c;
      color: white;
      font-size: 1.1em;
      border: none;
      transition: background-color 250ms, transform 250ms;
    }

    .toolbar-btn:hover {
      cursor: pointer;
      background-color: #c0392b;
      transform: scale(1.05);
    }

    .avatar-logout-btn {
      display: flex;
      align-items: center;
    }

    .avatar-logout-btn > * {
      margin-left: 1rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f1c40f;
      color: #2c3e50;
      font-size: 1.3em;
      font-weight: bolder;
    }
  `],
})
export class ToolbarComponent {
  @Input() isLoginBtnShown!: boolean;
  @Input() isRegisterBtnShown!: boolean;
  @Input() isLogoutBtnShown!: boolean;
  private as = inject(AuthService);
  private router = inject(Router);

  firstEmailLetter = localStorage.getItem('email');

  logout() {
    this.as.logout();
    this.router.navigate(['/login']);
  }

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleDarkTheme();
  }
}

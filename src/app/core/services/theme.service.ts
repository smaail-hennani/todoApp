import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeEnabled = false;

  toggleDarkTheme(): void {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    const className = 'dark-theme';
    if (this.darkThemeEnabled) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }
}

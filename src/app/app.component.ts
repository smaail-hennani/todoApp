import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tokenInterceptor } from './core/interceptor/token.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: tokenInterceptor,  // Utilisation de la fonction d'intercepteur
      multi: true // Permet d'ajouter plusieurs interceptors si nécessaire
    }
  ],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
}

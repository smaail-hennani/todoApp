import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tokenInterceptor } from './core/interceptor/token.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
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

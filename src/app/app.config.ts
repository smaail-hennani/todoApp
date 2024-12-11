import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('token'),
    allowedDomains: ['localhost:4200', 'https://backend.osc-fr1.scalingo.io/', 'localhost:4000'], // Remplacez par votre domaine d'API
    disallowedRoutes: ['localhost:4200/login', 'localhost:4200/register' ], // Routes à ignorer
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideHttpClient(withFetch()),
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
    },
    importProvidersFrom(HttpClientModule), // Import global de HttpClientModule
  ]
};

import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  // On réutilise la fonction donnée dans votre exemple
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    // Création de spies
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerNavigateSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configuration du module de test
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerNavigateSpy }
      ]
    });

    // Injection des spies
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('devrait retourner true si l’utilisateur est authentifié', () => {
    // On simule l’utilisateur authentifié
    authServiceSpy.isAuthenticated.and.returnValue(true);

    // On exécute le guard
    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    // Vérification : true et aucune navigation
    expect(canActivate).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('devrait retourner false et naviguer vers /login si l’utilisateur n’est pas authentifié', () => {
    // On simule l’utilisateur non authentifié
    authServiceSpy.isAuthenticated.and.returnValue(false);

    // On exécute le guard
    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    // Vérification : false et navigation vers /login
    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});

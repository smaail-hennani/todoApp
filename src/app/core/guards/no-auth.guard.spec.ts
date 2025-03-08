import { TestBed } from "@angular/core/testing";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { noAuthGuard } from "./no-auth.guard";
import { AuthService } from "../services/auth.service";

describe('no-authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => noAuthGuard(... guardParameters));

  beforeEach(() => {
    // Création des spies
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

  it('should return false and redirect to /todos if the user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/todos']);
  });

  it('should return true if the user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});

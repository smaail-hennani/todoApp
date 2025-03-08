import { TestBed, ComponentFixture } from '@angular/core/testing';
import LoginComponent from './login.component';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);
    TestBed.configureTestingModule({
      imports: [LoginComponent], // Composant standalone
      providers: [
        { provide: AuthService, useValue: spy},
        AuthService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    });


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should not call login when form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    fixture.detectChanges();
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call login and navigate when form is valid', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    authServiceSpy.login.and.returnValue(of({ token: 'fakeToken' }));
    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should disable the button when form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#login-button');
    expect(button.disabled).toBeTrue();
  });

  it('should enable the login button when form is valid', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#login-button');
    expect(button.disabled).toBeFalse();
  });

  it('should set showError to true on login failure', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.onSubmit();
    expect(component.showError).toBeTrue();
  });

  it('should show error message on login failure', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.onSubmit();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('p');
    expect(errorMsg.textContent).toEqual('Email ou mot de passe incorrect, veuillez vous inscrire');
  });

  it('should navigate to /todos on login success', () => {
    const navigateSpy = spyOn(component['router'], 'navigateByUrl');
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    authServiceSpy.login.and.returnValue(of({ token: 'fakeToken' }));
    component.onSubmit();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith('/todos');
  });

  it('should store token and email in localStorage on success', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    authServiceSpy.login.and.returnValue(of({ token: 'fakeToken'}));
    component.onSubmit();
    fixture.detectChanges();
    expect(localStorage.getItem('token')).toBe('fakeToken');
    expect(localStorage.getItem('email')).toBe('test@test.com');
  });

  it('should show error message if we don\'t have token', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    authServiceSpy.login.and.returnValue(of({} as any));
    component.onSubmit();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('p');
    expect(errorMsg.textContent).toEqual('Email ou mot de passe incorrect, veuillez vous inscrire');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
  });

  it('should display the toolbar component', () => {
    const toolbarEl = fixture.nativeElement.querySelector('app-toolbar');
    expect(toolbarEl).toBeTruthy();
  });

});

import { TestBed } from '@angular/core/testing';
import {
  ComponentFixture,
  inject,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '@core/service/auth.service';
import { User } from '@app/data/schema/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create the login form with correct fields', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.f.username).toBeDefined();
    expect(component.f.password).toBeDefined();
  });

  it('should call login service when form is submitted', fakeAsync(() => {
    // Simulate form submission with valid credentials
    component.loginForm.setValue({ username: 'user', password: 'password' });
    component.login();

    tick(); // Flush any pending asynchronous calls

    expect(authServiceSpy.login).toHaveBeenCalledWith({ username: 'user', password: 'password' });
  }));

  it('should navigate to dashboard on successful login', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of({} as User)); // Simulate successful login

    component.login();

    tick(); // Wait for observable to complete

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard/home']);
    expect(component.isLoading).toBeFalse();
  }));

  it('should display error message on login failure', fakeAsync(() => {
    const errorMessage = {} as User; // Change the type of the error message to match the type of the value emitted by the authServiceSpy.login method
    authServiceSpy.login.and.returnValue(of(errorMessage)); // Simulate login failure

    component.login();

    tick(); // Wait for observable to complete

    expect(component.error.toString()).toBe(errorMessage.toString());
    expect(component.isLoading).toBeFalse();
  }));
});

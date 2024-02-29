import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '@app/data/schema/user';

const defaultUser: User = {
  username: 'Default User',
  password: '12345',
  token: ''
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    }).compileComponents();
    service = TestBed.inject(AuthService);
  });

  it('should return the default user on successful login', () => {
    const loginContext = { username: 'Mathis', password: '12345', token: '12345' };
    service.login(loginContext).subscribe((user: User) => {
      expect(user).toEqual(defaultUser);
    });
  });

  it('should return an error observable on invalid login', () => {
    const loginContext = { username: 'invalid', password: 'invalid', token: '12345' };
    service.login(loginContext).subscribe({
      next: () => fail('Should not emit a value'),
      error: (error: any) => expect(error).toBe('Invalid username or password'),
    });
  });

  it('should return an observable of boolean on logout', () => {
    service.logout().subscribe((logoutResult: boolean) => {
      expect(logoutResult).toBe(false); // Adapt the expected value if needed
    });
  });
});

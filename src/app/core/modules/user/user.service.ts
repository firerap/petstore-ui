import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { IUser } from '../../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  public getCurrentUser() {
    return this.http.get<IUser>(`https://petstore.swagger.io/v2/user/findByStatus`);
  }

  public createUser(user: IUser) {
    return this.http.post<void>(`https://petstore.swagger.io/v2/user`, {
      email: user.email,
      password: user.password,
    });
  }

  public login(user: IUser) {
    return this.http.get<IUser>(`https://petstore.swagger.io/v2/user/login`, {
      params: {
        email: user.email,
        password: user.password,
      },
    }).pipe(
      // Prevent API error
      // TODO: remove when it is fixed
      catchError(_err => of(user)),
    );
  }

  public logout() {
    return this.http.get<void>(`https://petstore.swagger.io/v2/user/logout`);
  }

  public getUser(user: IUser) {
    // Temporary set test user
    return this.http.get<IUser>(`https://petstore.swagger.io/v2/user/string`);
  }
}

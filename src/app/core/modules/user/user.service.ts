import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  public getCurrentUser() {
    return this.http.get<IUser>(`https://petstore.swagger.io/v2/user/findByStatus`);
  }

  public createUser(user: Partial<IUser>) {
    return this.http.post<void>(`https://petstore.swagger.io/v2/user`, {
      email: user.email,
      password: user.password,
    });
  }

  public login(user: Partial<IUser>) {
    return this.http.get<IUser>(`https://petstore.swagger.io/v2/user/login`, {
      params: {
        email: user.email,
        password: user.password,
      },
      responseType: 'text',
    });
  }

  public logout() {
    return this.http.get<void>(`https://petstore.swagger.io/v2/user/logout`);
  }

  public getUser(user: Partial<IUser>) {
    // Temporary set test user
    return this.http.get<IUser>(`https://petstore.swagger.io/v2/user/string`);
  }
}

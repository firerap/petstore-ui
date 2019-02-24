import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseComponent, IAppState, IUser, UserActions } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends BaseComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private store: Store<IAppState>,
  ) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.LogoutAction());
  }

  public onSubmit() {
    this.store.pipe(
      select(s => s.user.current),
      filter(_ => !!_),
      takeUntil(this.destroy$),
    ).subscribe(user => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    });

    const user: IUser = {
      username: 'dvlasenko96',
      email: 'dvlasenko96@gmail.com',
      password: 'qwerty123',
    }

    this.isLoading = true;
    this.store.dispatch(new UserActions.CreateAction(user));
    // window.localStorage.setItem('user', JSON.stringify({}));
    // this.router.navigate(['/dashboard']);
  }
}

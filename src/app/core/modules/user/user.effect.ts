import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../app';
import { UserActions } from './user.action';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  @Effect()
  getCurrentUser$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(UserActions.ActionTypes.GET_CURRENT),
        switchMap((action: UserActions.GetCurrentAction) => {
          return this.userService.getCurrentUser()
            .pipe(
              map(user => {
                return new UserActions.ChangedAction({ current: user });
              }),
              catchError(err => of(new UserActions.ApiErrorAction(err))),
            );
        }));

  @Effect()
  createUser$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(UserActions.ActionTypes.CREATE),
        switchMap((action: UserActions.CreateAction) => {
          return this.userService.createUser(action.payload)
            .pipe(
              map(_ => new UserActions.LoginAction(action.payload)),
              catchError(err => of(new UserActions.ApiErrorAction(err))),
            );
        }));

  @Effect()
  login$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(UserActions.ActionTypes.LOGIN),
        switchMap((action: UserActions.LoginAction) => {
          return this.userService.login(action.payload)
            .pipe(
              tap(_ => window.localStorage.setItem('user', action.payload.username)),
              switchMap(_ => this.userService.getUser(action.payload)),
              map(user => new UserActions.ChangedAction({ current: user })),
              catchError(err => of(new UserActions.ApiErrorAction(err))),
            );
        }));

  @Effect()
  logout$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(UserActions.ActionTypes.LOGOUT),
        tap(_ => {
          window.localStorage.removeItem('user');
          return new UserActions.ChangedAction({ current: null });
        }),
        switchMap((action: UserActions.LogoutAction) => {
          return this.userService.logout()
            .pipe(
              map(user => new UserActions.ChangedAction({ current: null })),
              catchError(err => of(new UserActions.ApiErrorAction(err))),
            );
        }));

  @Effect()
  apiError$ =
    this.actions$
      .pipe(
        ofType(UserActions.ActionTypes.API_ERROR),
        withLatestFrom(this.store),
        map(([action, state]: [UserActions.ApiErrorAction, IAppState]) => {
          return new UserActions.ChangedAction({
            errors: [
              action.payload,
              ...(state.user.errors || [])
            ],
          });
        }));


  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<IAppState>,
  ) { }
}

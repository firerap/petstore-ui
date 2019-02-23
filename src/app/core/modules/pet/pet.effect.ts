import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../app';
import { PetActions } from './pet.action';
import { PetService } from './pet.service';

@Injectable()
export class PetEffects {
  @Effect()
  fetchPets$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(PetActions.ActionTypes.FETCH),
        switchMap((action: PetActions.FetchAction) => {
          return this.petService.fetchPets()
            .pipe(
              map(pets =>
                new PetActions.ChangedAction({ pets }),
              ),
              catchError(err => of(new PetActions.ApiErrorAction(err))),
            );
        }));

  @Effect()
  apiError$ =
    this.actions$
      .pipe(
        ofType(PetActions.ActionTypes.API_ERROR),
        withLatestFrom(this.store),
        map(([action, state]: [PetActions.ApiErrorAction, IAppState]) => {
          return new PetActions.ChangedAction({
            errors: [
              action.payload,
              ...(state.pet.errors || [])
            ],
          });
        }));


  constructor(
    private actions$: Actions,
    private petService: PetService,
    private store: Store<IAppState>,
  ) { }
}

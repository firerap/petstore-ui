
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalActions, ModalService } from './modal';
import { UIActions } from './ui.action';

@Injectable()
export class UIEffects {

  @Effect()
  modalOpen$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(ModalActions.ActionTypes.OPEN),
        map((action: ModalActions.OpenAction) => {
          const details = this.modal.open(action.payload);
          return new ModalActions.OpenedAction({
            open: true,
            cmpType: details.cmpType,
            title: details.trackTitle,
            latestResult: null // reset when opening
          });
        }));

  @Effect()
  modalOpened$: Observable<Action> =
    this.actions$.pipe(
      ofType(ModalActions.ActionTypes.OPENED),
      map((action: ModalActions.OpenedAction) =>
        new UIActions.ChangedAction({
          modal: action.payload,
        }),
      ));

  @Effect()
  modalClose$: Observable<Action> =
    this.actions$
      .pipe(
        ofType(ModalActions.ActionTypes.CLOSE),
        map((action: ModalActions.CloseAction) => {
          const closeResult = this.modal.close(action.payload);
          return new ModalActions.ClosedAction({
            open: false,
            cmpType: null,
            title: null,
            // keep null values to be consistent (instead of undefined)
            latestResult: typeof closeResult === 'undefined' ? null : closeResult,
          });
        }));

  @Effect()
  modalClosed$: Observable<Action> =
    this.actions$.pipe(
      ofType(ModalActions.ActionTypes.CLOSED),
      map((action: ModalActions.ClosedAction) =>
        new UIActions.ChangedAction({
          modal: action.payload,
        }),
      ));

  constructor(
    private actions$: Actions,
    private modal: ModalService,
  ) { }

}

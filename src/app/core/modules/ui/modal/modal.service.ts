
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IAppState } from '../../app';
import { ModalActions } from './modal.action';
import { ModalState } from './modal.state';

// open return value type
export interface IOpenReturn {
  cmpType: any;
  trackTitle?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _modalRef: MatDialogRef<any>;
  // convenient for easy access to when a modal closes along with it's result
  private _closed$: Subject<any> = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _store: Store<IAppState>
  ) { }

  public open(options: ModalState.IOptions) {
    const customOptions = Object.assign({
      data: options.props,
    }, options.modalOptions)
    this._modalRef = this._dialog.open(options.cmpType, customOptions);
    this._modalRef.keydownEvents().pipe(
      takeUntil(this._closed$),
      filter(keyEvent => keyEvent.keyCode === 27),
    ).subscribe(res => {
      if (!customOptions.disableClose) {
        console.log('Modal closed with:', 'escape button click');
        this._store.dispatch(new ModalActions.CloseAction());
      }
    });

    this._modalRef.backdropClick().pipe(
      takeUntil(this._closed$)
    ).subscribe(_ => {
      if (!customOptions.disableClose) {
        console.log('Modal closed with:', 'backdrop click');
        this._store.dispatch(new ModalActions.CloseAction());
      }
    });
    const details: IOpenReturn = {
      cmpType: options.cmpType,
    };
    console.log('Modal Opened');
    return details;
  }

  public close(latestResult?: any | { params: any; value?: any }) {
    if (!this._modalRef) { return; }
    this._modalRef.close();
    console.log('Modal closed');
    this._closeWithResult(latestResult);
    return latestResult;
  }

  private _closeWithResult(result?: any) {
    if (this._closed$) {
      if (typeof result !== 'undefined') {
        this._closed$.next(result);
      } else {
        // just emit true when canceling or for any other reason
        this._closed$.next(true);
      }
      if (this._closed$.observers && this._closed$.observers.length) {
        // ensure cleanup
        this._closed$.unsubscribe();
      }
    }
  }
}

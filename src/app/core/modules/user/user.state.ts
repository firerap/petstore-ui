import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../models';

export namespace UserState {
  export interface IErrorState {
    name: string;
    error: HttpErrorResponse
  }

  export interface IState {
    /**
     * Current user
     */
    current?: IUser;
    /**
     * User api errors that have occurred during user session.
     */
    errors?: Array<IErrorState>;
  }

  export const initialState: IState = {
    current: null,
    errors: [],
  };
}

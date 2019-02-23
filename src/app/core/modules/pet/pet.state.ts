import { HttpErrorResponse } from '@angular/common/http';
import { IPet } from '../../models';

export namespace PetState {
  export interface IErrorState {
    name: string;
    error: HttpErrorResponse
  }

  export interface IState {
    /**
     * Current pets
     */
    pets?: IPet[];
    /**
     * User api errors that have occurred during user session.
     */
    errors?: Array<IErrorState>;
  }

  export const initialState: IState = {
    pets: [],
    errors: [],
  };
}

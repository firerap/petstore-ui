import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { petReducer, PetState } from '../pet';
import { userReducer, UserState } from '../user';

export namespace AppActions {
  const CATEGORY: string = 'App';

  export interface IActions {
    NOOP: string;
  }

  export const ActionTypes: IActions = {
    NOOP: type(`${CATEGORY} Noop`),
  };

  export class NoopAction implements Action {
    type = ActionTypes.NOOP;
    payload: string = null;
  }

  export type Actions = NoopAction;
}

// overall shape of app state
export interface IAppState {
  pet: PetState.IState;
  user: UserState.IState;
}

export const AppReducer = {
  pet: petReducer,
  user: userReducer,
};

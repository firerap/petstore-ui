import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { IUser } from '../../models';
import { UserState } from './user.state';

export namespace UserActions {
  const CATEGORY = 'User';

  export interface IUserActions {
    GET_CURRENT: string;
    GET_ONE: string;
    CREATE: string;
    LOGIN: string;
    LOGOUT: string;
    CHANGE: string;
    CHANGED: string;
    DELETE: string;
    API_ERROR: string;
  }

  export const ActionTypes: IUserActions = {
    GET_CURRENT: type(`${CATEGORY} Get current`),
    GET_ONE: type(`${CATEGORY} Get one`),
    CREATE: type(`${CATEGORY} Create`),
    LOGIN: type(`${CATEGORY} Login`),
    LOGOUT: type(`${CATEGORY} Logout`),
    CHANGE: type(`${CATEGORY} Change`),
    CHANGED: type(`${CATEGORY} Changed`),
    DELETE: type(`${CATEGORY} Delete`),
    API_ERROR: type(`${CATEGORY} Api error`),
  };

  export class GetCurrentAction implements Action {
    type = ActionTypes.GET_CURRENT;
    payload: string = null;
    constructor() { }
  }

  export class GetOneAction implements Action {
    type = ActionTypes.GET_ONE;

    /**
     * @param payload user.id
     */
    constructor(public payload: number) { }
  }

  export class CreateAction implements Action {
    type = ActionTypes.CREATE;

    /**
     * @param payload user object
     */
    constructor(public payload: IUser) { }
  }

  export class LoginAction implements Action {
    type = ActionTypes.LOGIN;

    /**
     * @param payload user object
     */
    constructor(public payload: IUser) { }
  }

  export class LogoutAction implements Action {
    type = ActionTypes.LOGOUT;
    payload: string = null;

    constructor() { }
  }

  export class ChangeAction implements Action {
    type = ActionTypes.CHANGE;

    /**
     * @param payload user object
     */
    constructor(public payload: IUser) { }
  }

  /**
   * Users has changed; register changes in AppStore
   * Not intended to be used directly.
   */
  export class ChangedAction implements Action {
    type = ActionTypes.CHANGED;

    /**
     * @param payload Changes to Users
     */
    constructor(public payload: UserState.IState) { }
  }

  export class DeleteAction implements Action {
    type = ActionTypes.DELETE;

    /**
     * @param payload user.id
     */
    constructor(public payload: number) { }
  }

  export class ApiErrorAction implements Action {
    type = ActionTypes.API_ERROR;

    /**
     * @param payload error
     */
    constructor(public payload: UserState.IErrorState) { }
  }

  export type Actions =
    | GetCurrentAction
    | GetOneAction
    | CreateAction
    | LoginAction
    | ChangeAction
    | ChangedAction
    | DeleteAction
    | ApiErrorAction;
}

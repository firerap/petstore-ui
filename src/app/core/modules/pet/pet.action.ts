import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { IPet, IPetStatus } from '../../models';
import { PetState } from './pet.state';

export namespace PetActions {
  const CATEGORY = 'Pet';

  export interface IPetActions {
    FETCH: string;
    GET_ONE: string;
    CREATE: string;
    CHANGE: string;
    CHANGED: string;
    DELETE: string;
    API_ERROR: string;
  }

  export const ActionTypes: IPetActions = {
    FETCH: type(`${CATEGORY} Fetch`),
    GET_ONE: type(`${CATEGORY} Get one`),
    CREATE: type(`${CATEGORY} Create`),
    CHANGE: type(`${CATEGORY} Change`),
    CHANGED: type(`${CATEGORY} Changed`),
    DELETE: type(`${CATEGORY} Delete`),
    API_ERROR: type(`${CATEGORY} Api error`),
  };

  export class FetchAction implements Action {
    type = ActionTypes.FETCH;
    /**
     * @param payload pet status
     */
    constructor(public payload: IPetStatus = IPetStatus.PENDING) { }
  }

  export class GetOneAction implements Action {
    type = ActionTypes.GET_ONE;

    /**
     * @param payload pet.id
     */
    constructor(public payload: number) { }
  }

  export class CreateAction implements Action {
    type = ActionTypes.CREATE;

    /**
     * @param payload pet object
     */
    constructor(public payload: IPet) { }
  }

  export class ChangeAction implements Action {
    type = ActionTypes.CHANGE;

    /**
     * @param payload pet object
     */
    constructor(public payload: IPet) { }
  }

  /**
   * Pets has changed; register changes in AppStore
   * Not intended to be used directly.
   */
  export class ChangedAction implements Action {
    type = ActionTypes.CHANGED;

    /**
     * @param payload Changes to Pets
     */
    constructor(public payload: PetState.IState) { }
  }

  export class DeleteAction implements Action {
    type = ActionTypes.DELETE;

    /**
     * @param payload pet.id
     */
    constructor(public payload: number) { }
  }

  export class ApiErrorAction implements Action {
    type = ActionTypes.API_ERROR;

    /**
     * @param payload error
     */
    constructor(public payload: PetState.IErrorState) { }
  }

  // export class LoadAction implements Action {
  //   type = ActionTypes.LOAD;

  //   /**
  //    * @param token authenticated token
  //    */
  //   constructor(public payload: string) { }
  // }

  // export class LoginSuccessAction implements Action {
  //   type = ActionTypes.LOGIN_SUCCESS;

  //   /**
  //    * @param payload user object
  //    */
  //   constructor(public payload: User) { }
  // }

  // export class FetchAction implements Action {
  //   type = ActionTypes.FETCH;

  //   constructor(public payload: { force?: boolean } = { force: false }) { }
  // }

  // export class InitAction implements Action {
  //   type = ActionTypes.INIT;
  //   payload: string = null;
  //   constructor() { }
  // }

  // /**
  //  * Create user
  //  */
  // export class CreateAction implements Action {
  //   type = ActionTypes.CREATE;

  //   /**
  //    * @param payload user data
  //    */
  //   constructor(public payload: { user: User, type: string }) { }
  // }

  // /**
  //  * Change user
  //  */
  // export class ChangeAction implements Action {
  //   type = ActionTypes.CHANGE;

  //   /**
  //    * @param payload user params
  //    */
  //   constructor(public payload: any) { }
  // }

  // /**
  //  * Patch user
  //  */
  // export class PatchAction implements Action {
  //   type = ActionTypes.PATCH;

  //   /**
  //    * @param payload user params
  //    */
  //   constructor(public payload: any) { }
  // }

  // /**
  //  * Change user
  //  */
  // export class ChangeLanguageAction implements Action {
  //   type = ActionTypes.CHANGE_LANGUAGE;

  //   /**
  //    * @param payload language code (en, no)
  //    */
  //   constructor(public payload: string) { }
  // }

  // /**
  //  * User has changed; register changes in AppStore
  //  * Not intended to be used directly.
  //  */
  // export class ChangedAction implements Action {
  //   type = ActionTypes.CHANGED;

  //   /**
  //    * @param payload Changes to User
  //    */
  //   constructor(public payload: UserState.IState) { }
  // }

  // /**
  //  * Change user
  //  */
  // export class LogoutAction implements Action {
  //   type = ActionTypes.LOGOUT;
  //   payload?: HttpErrorResponse = null;
  //   constructor(public status?: HttpErrorResponse) {
  //     this.payload = status;
  //   }
  // }

  export type Actions =
    | FetchAction
    | GetOneAction
    | CreateAction
    | ChangeAction
    | ChangedAction
    | DeleteAction
    | ApiErrorAction;
}

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

  export type Actions =
    | FetchAction
    | GetOneAction
    | CreateAction
    | ChangeAction
    | ChangedAction
    | DeleteAction
    | ApiErrorAction;
}

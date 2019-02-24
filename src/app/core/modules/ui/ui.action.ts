import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { UIState } from './ui.state';

export namespace UIActions {
  const CATEGORY = 'UI';

  export interface IUIActions {
    CHANGED: string;
  }

  export const ActionTypes: IUIActions = {
    CHANGED: type(`${CATEGORY} Changed`),
  };

  /**
   * UI has changed; register changes in AppStore
   * Not intended to be UI directly.
   */
  export class ChangedAction implements Action {
    type = ActionTypes.CHANGED;

    /**
     * @param payload Changes to UI
     */
    constructor(public payload: UIState.IState) { }
  }

  export type Actions =
    | ChangedAction;
}

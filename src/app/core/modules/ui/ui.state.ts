import { ModalState } from './modal';

export namespace UIState {
  export interface IState {
    /**
     * Current modal state
     */
    modal?: ModalState.IState;
  }

  export const initialState: IState = {
    modal: ModalState.initialState,
  };
}

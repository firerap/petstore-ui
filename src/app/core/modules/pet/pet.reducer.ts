import { PetActions } from './pet.action';
import { PetState } from './pet.state';

export function petReducer(
  state: PetState.IState = PetState.initialState,
  action: PetActions.Actions,
): PetState.IState {
  const changeState = (customPayload?: any) => {
    return Object.assign({}, state, customPayload || action.payload);
  };
  switch (action.type) {
    case PetActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
};

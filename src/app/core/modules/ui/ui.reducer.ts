import { UIActions } from './ui.action';
import { UIState } from './ui.state';

export function uiReducer(
  state: UIState.IState = UIState.initialState,
  action: UIActions.Actions
): UIState.IState {
  const changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case UIActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
}

import {
  IInputSearchState,
  InputSearchAction,
  InputSearchActions,
} from '../../types/inputSearch';

const localState: IInputSearchState = {
  value: '',
};

export const inputSearchReducer = (
  state = localState,
  action: InputSearchAction
): IInputSearchState => {
  switch (action.type) {
    case InputSearchActions.CHANGE_VALUE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

export const createActionChangeValueInInputSearch = (
  value: string
): InputSearchAction => {
  return {
    type: InputSearchActions.CHANGE_VALUE,
    payload: value,
  };
};

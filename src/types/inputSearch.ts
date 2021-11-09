export interface IInputSearchState {
  value: string;
}

export enum InputSearchActions {
  CHANGE_VALUE = 'CGANGE_VALUE',
}

export type InputSearchAction = IActionChangeValueInInput;

interface IActionChangeValueInInput {
  type: InputSearchActions.CHANGE_VALUE;
  payload: string;
}

import { AppActionsUnion } from '../actions/app.actions';

export interface State {
  initialized: boolean;
}

export const initialState = {
  initialized: false,
};

export function reducer(state: State = initialState, action: AppActionsUnion) {
  switch (action.type) {
    default:
      return state;
  }
}

export const getInitialized = (state: State) => state.initialized;

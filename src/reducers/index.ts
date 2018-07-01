import * as fromApp from './app.reducer';

import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  app: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.debug('state', state);
    console.debug('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger, storeFreeze];

export const getAppState = createFeatureSelector<fromApp.State>('app');

export const getInitialized = createSelector(
  getAppState,
  fromApp.getInitialized,
);

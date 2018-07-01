import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromApp from './app.reducer';
import * as fromClient from './client.reducer';

export interface State {
  app: fromApp.State;
  client: fromClient.State;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
  client: fromClient.reducer,
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
export const getClientState = createFeatureSelector<fromApp.State>('client');

export const getInitialized = createSelector(
  getAppState,
  fromApp.getInitialized,
);

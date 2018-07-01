import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppActions } from '../actions/app.actions';
import * as fromApp from './app.reducer';
import * as fromClient from './client.reducer';
import * as fromJob from './job.reducer';

export interface State {
  app: fromApp.State;
  client: fromClient.State;
  job: fromJob.State;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
  client: fromClient.reducer,
  job: fromJob.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.debug('state', state);
    console.debug('action', action);

    return reducer(state, action);
  };
}

export function rehydrate(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    if (action.type === AppActions.Hydrate)
      return { ...state, ...action.payload };
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [
  logger,
  storeFreeze,
  rehydrate,
];

export const getAppState = createFeatureSelector<fromApp.State>('app');
export const getClientState = createFeatureSelector<fromClient.State>('client');
export const getJobState = createFeatureSelector<fromJob.State>('job');

export const getClients = createSelector(getClientState, fromClient.selectAll);
export const getJobs = createSelector(getJobState, fromJob.selectAll);
export const getInitialized = createSelector(
  getAppState,
  fromApp.getInitialized,
);

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Actions, Effect } from '@ngrx/effects';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, switchMap } from 'rxjs/operators';

import { AppActions, Hydrate } from '../actions/app.actions';
import { reducers, State } from '../reducers';
import * as fromApp from '../reducers/app.reducer';
import * as fromClient from '../reducers/client.reducer';
import * as fromJob from '../reducers/job.reducer';

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  initialize$ = this.actions$.ofType(AppActions.Initialize).pipe(
    map(() => {
      console.log('app initialized');
    }),
  );

  @Effect()
  loadFromStorage$ = this.actions$.ofType(AppActions.Initialize).pipe(
    switchMap(() => {
      return fromPromise(
        Promise.all(
          Object.getOwnPropertyNames(reducers).map(slice =>
            this.storage.get(slice).then(data => ({ slice, data })),
          ),
        ),
      );
    }),
    map(data =>
      data.reduce(
        (obj: any, { slice, data }: any) =>
          data ? { ...obj, [slice]: data } : obj,
        {},
      ),
    ),
    map(data => {
      const state: State = {
        app: fromApp.initialState,
        client: fromClient.initialState,
        job: fromJob.initialState,
      };
      return new Hydrate(state);
    }),
  );

  constructor(public actions$: Actions, public storage: Storage) {}
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Actions, Effect } from '@ngrx/effects';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, switchMap } from 'rxjs/operators';

import { AppActions, Hydrate } from '../actions/app.actions';
import { reducers } from '../reducers';

@Injectable()
export class AppEffects {
  @Effect()
  rehydrate$ = this.actions$.ofType(AppActions.Initialize).pipe(
    switchMap(() =>
      fromPromise(
        Promise.all(
          Object.getOwnPropertyNames(reducers).map(slice =>
            this.storage.get(slice).then(data => ({ slice, data })),
          ),
        ),
      ),
    ),
    map(data =>
      data.reduce(
        (obj: any, { slice, data }: any) =>
          data ? { ...obj, [slice]: data } : obj,
        {},
      ),
    ),
    map(data => new Hydrate(data)),
  );

  constructor(public actions$: Actions, public storage: Storage) {}
}

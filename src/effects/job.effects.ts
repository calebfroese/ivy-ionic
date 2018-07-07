import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

import { JobActions } from '../actions/job.actions';
import { getJobState } from '../reducers';

@Injectable()
export class JobEffects {
  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(
      JobActions.Create,
      JobActions.Delete,
      JobActions.Update,
      JobActions.Start,
      JobActions.Finish,
    )
    .pipe(
      switchMap(() => this.store.select(getJobState)),
      switchMap((state: any) => fromPromise(this.storage.set('job', state))),
    );

  constructor(
    public actions$: Actions,
    public store: Store<any>,
    public storage: Storage,
  ) {}
}

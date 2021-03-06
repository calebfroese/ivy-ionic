import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, tap, filter } from 'rxjs/operators';
import * as moment from 'moment';

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

  @Effect({ dispatch: false })
  notify$ = this.actions$.ofType(JobActions.Create).pipe(
    filter((action: any) => !!action.payload.notification),
    tap((action: any) => {
      const job: Job = action.payload;
      this.notifications.schedule({
        text: `Job for ${job.client.name} in ${moment(job.date).fromNow()}`,
        trigger: {
          at: moment(job.date)
            .subtract(2, 'hours')
            .toDate(),
        },
      });
    }),
  );

  constructor(
    public actions$: Actions,
    public store: Store<any>,
    public storage: Storage,
    public notifications: LocalNotifications,
  ) {}
}

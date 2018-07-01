import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

import { ClientActions } from '../actions/client.actions';
import { getClientState } from '../reducers';

@Injectable()
export class ClientEffects {
  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(ClientActions.Create, ClientActions.Delete, ClientActions.Update)
    .pipe(
      switchMap(() => this.store.select(getClientState)),
      switchMap((state: any) => fromPromise(this.storage.set('client', state))),
    );

  constructor(
    public actions$: Actions,
    public store: Store<any>,
    public storage: Storage,
  ) {}
}

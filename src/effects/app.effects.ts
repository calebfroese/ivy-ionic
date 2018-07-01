import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { AppActions } from '../actions/app.actions';

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  initialize$ = this.actions$.ofType(AppActions.Initialize).pipe(
    map(() => {
      console.log('app initialized');
    }),
  );

  constructor(private actions$: Actions) {}
}

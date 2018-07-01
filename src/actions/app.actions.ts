import { Action } from '@ngrx/store';

export enum AppActions {
  Hydrate = '[App] Hydrate',
  Initialize = '[App] Initialize',
}

export class Hydrate implements Action {
  readonly type = AppActions.Hydrate;
  constructor(public payload: any) {}
}
export class Initialize implements Action {
  readonly type = AppActions.Initialize;
}

export type AppActionsUnion = Hydrate | Initialize;

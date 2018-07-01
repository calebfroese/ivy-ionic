import { Action } from '@ngrx/store';

export enum AppActions {
  Initialize = '[App] Initialize',
}

export class Initialize implements Action {
  readonly type = AppActions.Initialize;
}

export type AppActionsUnion = Initialize;

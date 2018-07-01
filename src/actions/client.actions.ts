import { Action } from '@ngrx/store';

export enum ClientActions {
  Create = '[Client] Create',
}

export class Create implements Action {
  readonly type = ClientActions.Create;
}

export type ClientActionsUnion = Create;

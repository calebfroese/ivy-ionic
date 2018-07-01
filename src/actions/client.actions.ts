import { Action } from '@ngrx/store';

export enum ClientActions {
  Create = '[Client] Create',
}

export class Create implements Action {
  readonly type = ClientActions.Create;
  constructor(public payload: Client) {}
}

export type ClientActionsUnion = Create;

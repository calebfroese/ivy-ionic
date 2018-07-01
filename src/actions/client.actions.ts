import { Action } from '@ngrx/store';

export enum ClientActions {
  Create = '[Client] Create',
  Update = '[Client] Update',
  Delete = '[Client] Delete',
}

export class Create implements Action {
  readonly type = ClientActions.Create;
  constructor(public payload: Pick<Client, Exclude<keyof Client, 'id'>>) {}
}
export class Update implements Action {
  readonly type = ClientActions.Update;
  constructor(public payload: Client) {}
}
export class Delete implements Action {
  readonly type = ClientActions.Delete;
  constructor(public payload: Client['id']) {}
}

export type ClientActionsUnion = Create | Update | Delete;

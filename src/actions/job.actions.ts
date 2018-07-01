import { Action } from '@ngrx/store';

export enum JobActions {
  Create = '[Job] Create',
  Update = '[Job] Update',
  Delete = '[Job] Delete',
}

export class Create implements Action {
  readonly type = JobActions.Create;
  constructor(public payload: Pick<Job, Exclude<keyof Job, 'id'>>) {}
}
export class Update implements Action {
  readonly type = JobActions.Update;
  constructor(public payload: Job) {}
}
export class Delete implements Action {
  readonly type = JobActions.Delete;
  constructor(public payload: Job['id']) {}
}

export type JobActionsUnion = Create | Update | Delete;

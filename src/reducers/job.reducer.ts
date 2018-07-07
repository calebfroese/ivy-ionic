import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as uuid from 'uuid';

import { JobActions, JobActionsUnion } from '../actions/job.actions';

const job = createEntityAdapter<Job>();

export interface State extends EntityState<Job> {}

export const initialState: State = job.getInitialState();

export function reducer(state: State = initialState, action: JobActionsUnion) {
  switch (action.type) {
    case JobActions.Create:
      return job.addOne({ ...action.payload, id: uuid() }, state);

    case JobActions.Update:
      return job.updateOne(
        { id: action.payload.id, changes: action.payload },
        state,
      );

    case JobActions.Start:
      return job.updateOne(
        { id: action.payload.id, changes: { startedAt: new Date() } },
        state,
      );

    case JobActions.Finish:
      return job.updateOne(
        { id: action.payload.id, changes: { finishedAt: new Date() } },
        state,
      );

    case JobActions.Delete:
      return job.removeOne(action.payload, state);

    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = job.getSelectors();

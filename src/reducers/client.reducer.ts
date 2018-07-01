import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as uuid from 'uuid';

import { ClientActions, ClientActionsUnion } from '../actions/client.actions';

const clientAdapter = createEntityAdapter<Client>();

export interface State extends EntityState<Client> {}

export const initialState: State = clientAdapter.getInitialState();

export function reducer(
  state: State = initialState,
  action: ClientActionsUnion,
) {
  switch (action.type) {
    case ClientActions.Create:
      return clientAdapter.addOne({ ...action.payload, id: uuid() }, state);

    case ClientActions.Update:
      return clientAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state,
      );

    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = clientAdapter.getSelectors();

import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { ClientActionsUnion, ClientActions } from '../actions/client.actions';

const clientAdapter = createEntityAdapter<Client>();

export interface State extends EntityState<Client> {}

export const initialState: State = clientAdapter.getInitialState();

export function reducer(
  state: State = initialState,
  action: ClientActionsUnion,
) {
  switch (action.type) {
    case ClientActions.Create:
      return clientAdapter.addOne(action.payload, state);

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

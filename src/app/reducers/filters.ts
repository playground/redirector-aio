import { ActionReducer, Action } from '@ngrx/store';

import { SHOW_ALL, SHOW_ACTIVE, SHOW_INACTIVE } from '../common/actions';
import { IState } from '../common/interfaces';

const initialState = (obj) => true;
export function filterReducer(state = initialState, action: Action) {
  console.log('filters', state, action);
  switch(action.type) {
    case SHOW_ACTIVE:
      return (redirect) => redirect.active === true;
    case SHOW_INACTIVE:
      return (redirect) => redirect.active === false;
    case SHOW_ALL:
    default:
      return state;
  }
}

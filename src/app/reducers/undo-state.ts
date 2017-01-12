import { ActionReducer, Action } from '@ngrx/store';
import { UndoState } from '../common/interfaces';
import { UNDO, REDO } from '../common/actions';

export function undoStateReducer(reducer: ActionReducer<any>) {
  // Initialise initial state
  const initialState: UndoState = {
    past: [],
    present: reducer(undefined, {type: '__INIT__'}),
    future: []
  }

  // returns reducer so it can operate on redirects states
  return function(state = initialState, action) {
    const {past, present, future} = state;

    switch(action.type) {
      case UNDO:
        const rewind = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: rewind,
          future: [present,...future]
        }
      case REDO:
        const forward = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: forward,
          future: newFuture
        }
      default:
        // Not undoing or redoing, delegate to redirect reducer
        const newPresent = reducer(present, action);
        return (present === newPresent) ? state : {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}
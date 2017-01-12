import { ActionReducer, Action } from '@ngrx/store';
import { Redirect } from '../redirect/redirect.model';
import { INIT, ADD, DELETE, REORDER, UPDATE, DISABLE, UNDO, REDO } from '../common/actions';
import { IState } from '../common/interfaces';
import {SHOW_ALL} from "../common/actions";
import {SHOW_INACTIVE} from "../common/actions";
import {SHOW_ACTIVE} from "../common/actions";

const initialState = {
  past: [],
  present: [],
  future: []
};

export function redirectReducer(state: IState = initialState, action: Action) {
  const {past, present, future} = state;
  let newPast, newPresent, newFuture, newState, newConfig;
  console.log('state first', state)
  switch(action.type) {
    case INIT:
      return {
        past: [],
        present: {redirects: action.payload.data, config: action.payload.config},
        future: []
      };
    case ADD:
      newPresent = present.redirects.concat(action.payload.data);
      return {
        past: [...past, present],
        present: {redirects: newPresent, config: action.payload.config},
        future: future
      };
    case DELETE:
      newPresent = present.redirects.filter((redirect) => redirect.id !== action.payload.data.id);
      return {
        past: [...past, present],
        present: {redirects: newPresent, config: action.payload.config},
        future: future
      };
    case UPDATE:
    case DISABLE:
      newPresent = present.redirects.map((redirect) => {
        if(redirect.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return redirect;
        }
      });
      return {
        past: [...past, present],
        present: {redirects: newPresent, config: action.payload.config},
        future: future
      };
    case REORDER:
      return {
        past: [...past, present],
        present: {redirects: action.payload.data, config: action.payload.config},
        future: future
      };
    case UNDO:
      if(past.length > 0) {
        const rewind = past[past.length - 1];
        newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: rewind,
          future: [present, ...future]
        };
      } else {
        return state;
      }
    case REDO:
      if(future.length > 0) {
        const forward = future[0];
        newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: forward,
          future: newFuture
        };
      } else {
        return state;
      }
    case SHOW_ACTIVE:
    case SHOW_ALL:
    case SHOW_INACTIVE:
      if(action.payload.config && present.config && present.config.path !== action.payload.config.path) {
        newPresent = {redirects: present.redirects, config: action.payload.config};
        return {
          past: [...past, present],
          present: newPresent,
          future: future
        };
      } else {
        return state;
      }
    default:
      console.log('state default', state, action);
      return state;
  }
}
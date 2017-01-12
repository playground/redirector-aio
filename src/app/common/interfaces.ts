import { ActionReducer } from '@ngrx/store';

import { Redirect } from '../redirect/redirect.model'

export interface AppState {
  redirects: IState[],
  filters: any
}

export interface IState {
  past: any,
  present: any,
  future: any
};

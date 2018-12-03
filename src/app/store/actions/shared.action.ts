import { Action } from '@ngrx/store';


export enum SharedTypes {
  ERROR = '[Shared] Error',
  START_LOADING = '[Shared] START_LOADING',
  STOP_LOADING = '[Shared] STOP_LOADING'
}

export class HandleError implements Action {
  readonly type = SharedTypes.ERROR;
  constructor(public payload: any) {
  }
}

export class StartLoading implements Action {
  readonly type = SharedTypes.START_LOADING;
}

export class StopLoading implements Action {
  readonly type = SharedTypes.STOP_LOADING;
}

export type AllShared =
  | HandleError
  | StartLoading
  | StopLoading;

import { Action } from '@ngrx/store';


export enum SharedTypes {
  ERROR = '[Shared] Error',
}

export class HandleError implements Action {
  readonly type = SharedTypes.ERROR;
  constructor(public payload: any) {
    console.log(1111111);

  }
}

export type AllShared =
  | HandleError;

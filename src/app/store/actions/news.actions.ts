import { Action } from '@ngrx/store';
import { News } from '../../models/news.model';


export enum NewsActionTypes {
  LOAD_NEWS = '[News] Load News',
  LOAD_NEWS_SUCCESS = '[News] Load News Success',
  ADD_NEWS = '[News] Add News',
  ADD_NEWS_SUCCESS = '[News] Add News success'
}

export class LoadNews implements Action {
  readonly type = NewsActionTypes.LOAD_NEWS;
  constructor() { }
}
export class LoadNewsSuccess implements Action {
  readonly type = NewsActionTypes.LOAD_NEWS_SUCCESS;
  constructor(public payload: Array<News>) { }
}

export class AddNews implements Action {
  readonly type = NewsActionTypes.ADD_NEWS;
  constructor(public payload: News) { }
}

export class AddNewsSuccess implements Action {
  readonly type = NewsActionTypes.ADD_NEWS_SUCCESS;
  constructor(public payload: News) { }
}


export type NewsActions =
  | LoadNews
  | LoadNewsSuccess
  | AddNews
  | AddNewsSuccess;

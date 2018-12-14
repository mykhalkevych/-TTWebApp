import { News } from '../../models/News.model';
import { NewsActionTypes, NewsActions } from '../actions/News.actions';

export interface State {
  news: Array<News>;
}

export const initialState: State = {
  news: [],
};


export function reducer(state = initialState, action: NewsActions): State {
  switch (action.type) {
    case NewsActionTypes.LOAD_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload
      };
    }
    case NewsActionTypes.ADD_NEWS_SUCCESS: {
      return {
        ...state,
        news: [...state.news, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}

export const getNews = (state: State) => state.news;



import { News } from '../../models/news.model';
import { NewsActionTypes, NewsActions } from '../actions/news.actions';

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
    case NewsActionTypes.UPDATE_NEWS_SUCCESS: {
      return {
        ...state,
        news: state.news.map(newsItem => newsItem.id === action.payload.id ? action.payload : newsItem)
      };
    }
    case NewsActionTypes.DELETE_NEWS_SUCCESS: {
      return {
        ...state,
        news: state.news.filter(newsItem => newsItem.id !== action.payload.id)
      };
    }
    default: {
      return state;
    }
  }
}

export const getNews = (state: State) => state.news;



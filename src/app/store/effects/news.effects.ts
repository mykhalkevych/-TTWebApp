import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppState } from './../app.states';
import {
  AddNews, AddNewsSuccess, NewsActionTypes,
  LoadNewsSuccess, UpdateNews, UpdateNewsSuccess,
  DeleteNewsSuccess, DeleteNews
} from './../actions/news.actions';
import { HandleError, StartLoading, StopLoading } from '../actions/shared.action';
import { NewsService } from './../../services/news/news.service';
import { News } from 'src/app/models/news.model';




@Injectable()
export class NewsEffects {
  constructor(
    private actions: Actions,
    private newsService: NewsService,
    private store: Store<AppState>
  ) { }

  @Effect()
  LoadNews: Observable<any> = this.actions
    .pipe(
      ofType(NewsActionTypes.LOAD_NEWS),
      mergeMap(_ => {
        return this.newsService.loadNews()
          .pipe(
            map((news: Array<News>) => new LoadNewsSuccess(news)),
            catchError(error => of(new HandleError({ error: error })))
          );
      }));

  @Effect({ dispatch: false })
  AddNews: Observable<any> = this.actions
    .pipe(
      ofType(NewsActionTypes.ADD_NEWS),
      switchMap((action: AddNews) => {
        // this.store.dispatch(new StartLoading());
        return this.newsService.addNews(action.payload)
          .then(_ => {
            this.store.dispatch(new StopLoading());
            return new AddNewsSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
  @Effect({ dispatch: false })
  UpdateNews: Observable<any> = this.actions
    .pipe(
      ofType(NewsActionTypes.UPDATE_NEWS),
      switchMap((action: UpdateNews) => {
        return this.newsService.updateNews(action.payload)
          .then(_ => {
            // this.store.dispatch(new StopLoading());
            // return new UpdateNewsSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
  @Effect()
  DeleteNews: Observable<any> = this.actions
    .pipe(
      ofType(NewsActionTypes.DELETE_NEWS),
      switchMap((action: DeleteNews) => {
        this.store.dispatch(new StartLoading());
        return this.newsService.deleteNews(action.payload)
          .then(_ => {
            this.store.dispatch(new StopLoading());
            return new DeleteNewsSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
}

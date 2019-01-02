import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromShared from './reducers/shared.reducer';
import * as fromPlayer from './reducers/player.reducer';
import * as fromNews from './reducers/news.reducer';
import * as fromGames from './reducers/games.reducer';

export interface AppState {
    authState: fromAuth.State;
    sharedState: fromShared.State;
    playerState: fromPlayer.State;
    newsState: fromNews.State;
    gamesState: fromGames.State;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: fromAuth.reducer,
    sharedState: fromShared.reducer,
    playerState: fromPlayer.reducer,
    newsState: fromNews.reducer,
    gamesState: fromGames.reducer
};

export const selectAuthState = createFeatureSelector<fromAuth.State>('authState');
export const getIsAuthenticated = createSelector(selectAuthState, fromAuth.getIsAuthenticated);
export const getCurrentUser = createSelector(selectAuthState, fromAuth.getCurrentUser);

export const selectSharedState = createFeatureSelector<fromShared.State>('sharedState');
export const getIsLoading = createSelector(selectSharedState, fromShared.getIsloading);

export const selectNewsState = createFeatureSelector<fromNews.State>('newsState');
export const selectNews = createSelector(selectNewsState, fromNews.getNews);

export const selectPlayersState = createFeatureSelector<fromPlayer.State>('playerState');
export const selectPlayers = createSelector(selectPlayersState, fromPlayer.getPlayers);
export const selectCurrentPlayer = createSelector(selectPlayersState, fromPlayer.getCurrentPlayer);

export const selectGamesState = createFeatureSelector<fromGames.State>('gamesState');
export const selectGames = createSelector(selectGamesState, fromGames.getGames);


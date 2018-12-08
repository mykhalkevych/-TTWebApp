import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromShared from './reducers/shared.reducer';
import * as fromPlayer from './reducers/player.reducer';

export interface AppState {
    authState: fromAuth.State;
    sharedState: fromShared.State;
    playerState: fromPlayer.State;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: fromAuth.reducer,
    sharedState: fromShared.reducer,
    playerState: fromPlayer.reducer
};

export const selectAuthState = createFeatureSelector<fromAuth.State>('authState');
export const getIsAuthenticated = createSelector(selectAuthState, fromAuth.getIsAuthenticated);

export const selectSharedState = createFeatureSelector<fromShared.State>('sharedState');
export const getIsLoading = createSelector(selectSharedState, fromShared.getIsloading);

export const selectPlayersState = createFeatureSelector<fromPlayer.State>('playerState');
export const selectPlayers = createSelector(selectPlayersState, fromPlayer.getPlayers);



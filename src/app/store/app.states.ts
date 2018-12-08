import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducer';
import * as shared from './reducers/shared.reducer';
import * as fromPlayer from './reducers/player.reducer';

export interface AppState {
    authState: auth.State;
    sharedState: shared.State;
    playerState: fromPlayer.State;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: auth.reducer,
    sharedState: shared.reducer,
    playerState: fromPlayer.reducer
};

export const selectAuthState = createFeatureSelector<auth.State>('authState');
export const selectSharedState = createFeatureSelector<shared.State>('sharedState');
export const getIsLoading = createSelector(selectSharedState, shared.getIsloading);



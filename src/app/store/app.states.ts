import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducer';
import * as shared from './reducers/shared.reducer';

export interface AppState {
    authState: auth.State;
    sharedState: shared.State;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: auth.reducer,
    sharedState: shared.reducer
};

export const selectAuthState = createFeatureSelector<auth.State>('authState');
export const selectSharedState = createFeatureSelector<shared.State>('sharedState');
export const getIsLoading = createSelector(selectSharedState, shared.getIsloading);



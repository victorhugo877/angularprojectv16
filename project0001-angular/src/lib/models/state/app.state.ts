import { RouterReducerState } from '@ngrx/router-store/src/reducer';
import { Action, MemoizedSelector } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export namespace AppStateModel {

    export const APP_FEATURE_KEY = 'app';

    export interface IStatePartialAction<T> {
        payload: T;
    }

    export type ActionCreator<T> = (props: T) => T & TypedAction<string>;

    export interface IStateAction<T> extends Action, IStatePartialAction<T> {}

    export interface IAppState {
        readonly tokenSession: string;
    }

    export interface IAppPartialState {
    /** Property to simulate integration with the global object of the app property status */
    readonly [APP_FEATURE_KEY]: IAppState;
    }

    export interface IAppStateRoot {
        /** Property to simulate integration with the global object of the app property status */
        readonly [APP_FEATURE_KEY]: IAppState;
        /** Property to simulate integration with the global object of the router property status */
        readonly router: RouterReducerState;
    }

    export interface IPayloadSetTokenSession {
        tokenSession: string;
    }

    export interface IAppSelectors {
        getTokenSession: MemoizedSelector<AppStateModel.IAppPartialState, string>;
    }

    export type StateActionTypesPayload = 
    IStateAction<IPayloadSetTokenSession> 

    export const INITIAL_STATE: IAppState = {
        tokenSession: '',
    };

    export enum AppActionTypes {
        SET_TOKEN_SESSION = '[APP] SET_TOKEN_SESSION',
    }
}
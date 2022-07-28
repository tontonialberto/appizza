import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import * as fromSeller from './product-catalog/store/seller.reducer';

export interface AppState {
    seller: fromSeller.State
}

export const appReducer: ActionReducerMap<AppState> = {
    seller: fromSeller.sellerReducer
}
import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import * as fromSeller from './product-catalog/store/seller.reducer';
import * as fromAdmin from "./admin-panel/store/admin.reducer";

export interface AppState {
    seller: fromSeller.State,
    admin: fromAdmin.State
}

export const appReducer: ActionReducerMap<AppState> = {
    seller: fromSeller.sellerReducer,
    admin: fromAdmin.adminReducer
}
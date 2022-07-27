import { createReducer, on } from "@ngrx/store";
import { addPizza as createPizza } from "./app.actions";
import { Pizza } from "./_models/pizza.model";

export interface State {
    pizzas: Pizza[]
}

export interface AppState {
    app: State;
}

const initialState: State = {
    pizzas: [new Pizza('Margherita', 1.5, true, 'Buonissima, come la facciamo noi!', '')]
};

export const appReducer = createReducer(
    initialState,
    on(createPizza, (state: State, { pizza }) => {
        return {
            ...state,
            pizzas: [ ...state.pizzas, pizza ]
        };
    })
);
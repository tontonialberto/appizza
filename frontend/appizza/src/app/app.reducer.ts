import { createReducer, on } from "@ngrx/store";
import { addPizza } from "./app.actions";
import { Pizza } from "./_models/pizza.model";

const initialState = {
    pizzas: [new Pizza('Margherita', 1.5, true, 'Buonissima, come la facciamo noi!', '')]
};

export const appReducer = createReducer(
    initialState,
    on(addPizza, (state, { pizza }) => {
        return {
            ...state,
            pizzas: [ ...state.pizzas, pizza ]
        };
    })
);
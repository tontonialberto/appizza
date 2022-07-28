import { createReducer, on } from "@ngrx/store";
import { createPizza as createPizza, endUpdatingPizza, startUpdatingPizza as startUpdatingPizza, updatePizza } from "./app.actions";
import { Pizza } from "./_models/pizza.model";

export interface State {
    pizzas: Pizza[];
    currentEditingPizza: Pizza | null;
}

export interface AppState {
    app: State;
}

const initialState: State = {
    pizzas: [new Pizza('Margherita', 1.5, true, 'Buonissima, come la facciamo noi!', '')],
    currentEditingPizza: null
};

export const appReducer = createReducer(
    initialState,
    on(createPizza, (state: State, pizza: Pizza) => {
        return {
            ...state,
            pizzas: [ ...state.pizzas, pizza ]
        };
    }),
    on(startUpdatingPizza, (state: State, props: { id: number }) => {
        return {
            ...state,
            currentEditingPizza: state.pizzas.find(p => props.id === p.id)
        };
    }),
    on(endUpdatingPizza, (state: State) => {
        return {
            ...state,
            currentEditingPizza: null
        };
    }),
    on(updatePizza, (state: State, pizza: Pizza) => {
        const updatedPizzas = [
            ...state.pizzas.filter(p => p.id !== pizza.id),
            pizza
        ]
        return {
            ...state,
            pizzas: updatedPizzas
        };
    })
);
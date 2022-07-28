import { createReducer, on } from "@ngrx/store";
import { createPizza as createPizza, deletePizza, endUpdatingPizza, startUpdatingPizza as startUpdatingPizza, updatePizza } from "./app.actions";
import { Pizza } from "./_models/pizza.model";

export interface State {
    pizzas: Pizza[];
    currentUpdatingPizza: Pizza | null;
}

export interface AppState {
    app: State;
}

const initialState: State = {
    pizzas: [new Pizza('Margherita', 1.5, true, 'Buonissima, come la facciamo noi!', '')],
    currentUpdatingPizza: null
};

export const appReducer = createReducer(
    initialState,
    on(createPizza, (state: State, pizza: Pizza) => {
        return {
            ...state,
            pizzas: [...state.pizzas, pizza]
        };
    }),
    on(startUpdatingPizza, (state: State, props: { id: number }) => {
        const selectedPizza: Pizza = state.pizzas.find(p => props.id === p.id);

        if (selectedPizza !== undefined) {
            return {
                ...state,
                currentUpdatingPizza: { ...selectedPizza }
            };
        }
        else {
            return {
                ...state,
                currentUpdatingPizza: null
            }
        }
    }),
    on(endUpdatingPizza, (state: State) => {
        return {
            ...state,
            currentUpdatingPizza: null
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
    }),
    on(deletePizza, (state: State, props: { id: number }) => {
        const pizzaToBeDeleted = state.pizzas.find(p => p.id === props.id);
        if(pizzaToBeDeleted !== undefined) {
            return {
                ...state,
                pizzas: state.pizzas.filter(p => p.id !== props.id)
            }
        }
        else {
            return {
                ...state
            };
        }
    })
);
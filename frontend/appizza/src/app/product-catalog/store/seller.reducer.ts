import { createReducer, on } from "@ngrx/store";
import { Pizza } from "src/app/_models/pizza.model";
import { createPizza, deletePizza, endUpdatingPizza, startUpdatingPizza, updatePizza } from "./seller.actions";

export interface State {
    pizzas: Pizza[];
    currentUpdatingPizza: Pizza | null;
}

const initialState: State = {
    pizzas: [new Pizza('Margherita', 1.5, true, 'Buonissima, come la facciamo noi!', '')],
    currentUpdatingPizza: null
};

export const sellerReducer = createReducer(
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
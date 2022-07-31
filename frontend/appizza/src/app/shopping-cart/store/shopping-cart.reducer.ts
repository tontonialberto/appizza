import { createReducer, on } from "@ngrx/store";
import { Pizza } from "src/app/_models/pizza.model";
import { addToCart } from "./shopping-cart.actions";

export class ShoppingItem {
    id: number;

    constructor(public product: Pizza, public quantity: number) {
        this.id = ShoppingItem.idCounter++;
    }

    private static idCounter = 0;
}

export interface State {
    cart: ShoppingItem[];
}

const initialState: State = {
    cart: []
}

export const shoppingCartReducer = createReducer(
    initialState,
    on(addToCart, (state, props: { product: Pizza, quantity: number }) => {
        console.log(state.cart);
        return {
            ...state,
            cart: [ ...state.cart, new ShoppingItem({ ...props.product }, props.quantity) ]
        };
    })
);
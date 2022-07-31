import { createAction, props } from "@ngrx/store";
import { Pizza } from "src/app/_models/pizza.model";

export const addToCart = createAction(
    '[SHOPPING CART] Add to Cart', 
    props<{product: Pizza, quantity: number}>()
);
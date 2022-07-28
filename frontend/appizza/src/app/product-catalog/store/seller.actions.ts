import { createAction, props } from "@ngrx/store";
import { Pizza } from "src/app/_models/pizza.model";

export const createPizza = createAction('[SELLER] Add Pizza', props<Pizza>());

export const startUpdatingPizza = createAction('[SELLER] Start Updating Pizza', props<{id: number}>());

export const endUpdatingPizza = createAction('[SELLER] End Updating Pizza');

export const updatePizza = createAction('[SELLER] Update Pizza', props<Pizza>());

export const deletePizza = createAction('[SELLER] Delete Pizza', props<{id: number}>());
import { createAction, props } from "@ngrx/store";
import { Pizza } from "./_models/pizza.model";

export const createPizza = createAction('ADD_PIZZA', props<Pizza>());

export const startUpdatingPizza = createAction('START_UPDATING_PIZZA', props<{id: number}>());

export const endUpdatingPizza = createAction('END_UPDATING_PIZZA');

export const updatePizza = createAction('UPDATE_PIZZA', props<Pizza>());
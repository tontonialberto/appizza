import { createAction, props } from "@ngrx/store";
import { Pizza } from "./_models/pizza.model";

export const addPizza = createAction('ADD_PIZZA', props<{pizza: Pizza}>());